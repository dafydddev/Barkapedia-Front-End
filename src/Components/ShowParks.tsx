import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ParksList from "./ParksList";
import Map from "./Map";
import server from "../Api/api";
import { Park } from "../types/CustomTypes";
import { LatLngTuple } from "leaflet";
import ParksListCard from "./ParksListCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ShowParks() {
  const [value, setValue] = React.useState(0);
  const [parks, setParks] = React.useState<Park[]>([]);
  const [mapMarkers, setMapMarkers] = React.useState<
    { position: LatLngTuple; content: string; parkId: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedParkId, setSelectedParkId] = React.useState<string | null>(
    null
  );
  const [selectedPark, setSelectedPark] = React.useState<Park | null>(null);

  const center: LatLngTuple = [51.507268, -0.166791];

  React.useEffect(() => {
    server.get(`/parks`).then(({ data }) => {
      setParks(data);
      setMapMarkers(
        data.map((park: Park) => ({
          position: [
            parseFloat(park.location.lat),
            parseFloat(park.location.long),
          ],
          content: park.name,
          parkId: park.id,
        }))
      );
      setIsLoading(false);
    });
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMarkerClick = (parkId: string) => {
    setSelectedParkId(parkId);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="View by Map" {...a11yProps(0)} />
          <Tab label="View List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Map
          center={center}
          markers={mapMarkers}
          onMarkerClick={handleMarkerClick}
          selectedParkId={selectedParkId}
          parks={parks}
          isListView={true}
        />
        {selectedPark && <ParksListCard park={selectedPark} fullWidth={false} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ParksList parks={parks} isLoading={isLoading} />
      </TabPanel>
    </Box>
  );
}