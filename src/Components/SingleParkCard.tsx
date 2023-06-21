import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { LatLngTuple } from "leaflet";
import { Park, Review } from "../types/CustomTypes";
import ParkRating from "./StarRating";
import Map from "./Map";
import ParkReviews from "./ParkReviews";
import "../Styles/styles.css";
import { Button } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface SingleParkProps {
  singlePark: Park;
  reviews: Review[];
  isLoading: boolean;
}

export default function SingleParkCard({
  singlePark,
  reviews,
  isLoading,
}: SingleParkProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [parks, _setParks] = React.useState<Park[]>([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const parsedLat = parseFloat(singlePark.location.lat);
  const parsedLong = parseFloat(singlePark.location.long);

  const parsedCenter: LatLngTuple = [parsedLat, parsedLong];
  const mapMarkers = [
    {
      position: [parsedLat, parsedLong] as LatLngTuple,
      content: singlePark.name,
      parkId: singlePark.id
    },
  ];

  const [selectedParkId, setSelectedParkId] = React.useState<string | null>(
    null
  );
  const handleMarkerClick = (parkId: string) => {
    setSelectedParkId(parkId);
  };

  if (isLoading) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardHeader title={singlePark.name} subheader={singlePark.address.city} />
      <CardContent>
        <ParkRating
          rating={singlePark.current_average_rating}
          reviewCount={singlePark.current_review_count}
        />
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={singlePark.image_url}
        alt={singlePark.name}
      />
      <CardContent>
        <Map
          center={parsedCenter}
          markers={mapMarkers}
          parks={parks}
          isListView={false}
          onMarkerClick={handleMarkerClick}
          selectedParkId={selectedParkId}
        />
        <Typography sx={{marginTop:"20px"}} variant="body2" color="text.secondary">
          {singlePark.desc}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            <Box sx={{display:"flex", justifyContent:"space-evenly", margin:"20px 0"}}>
            {singlePark.features.isFree && <Button className="filter-button" variant="outlined">
                Free
              </Button>}
            <br />
            {singlePark.features.isWellLit && (
              <Button className="filter-button" variant="outlined">
                Well Lit
              </Button>
            )}

            {singlePark.features.isParking && (
              <Button className="filter-button" variant="outlined">
                Parking
              </Button>
            )}
            {singlePark.features.isFreeParking && (
              <Button className="filter-button" variant="outlined">
                Free Parking
              </Button>
            )}

            {singlePark.features.hasAgilityEquipment && (
              <Button className="filter-button" variant="outlined">
                Agility Equipment
              </Button>
            )}

            {singlePark.features.isFullyEnclosed && (
              <Button className="filter-button" variant="outlined">
                Fully Enclosed
              </Button>
            )}
            {singlePark.features.hasDisabledAccess && (
              <Button className="filter-button" variant="outlined">
                Disabled Access
              </Button>
            )}
            </Box>

            {singlePark.address.firstLine &&
              singlePark.address.firstLine + ", "}
            {singlePark.address.secondLine &&
              singlePark.address.secondLine + ", "}
            {singlePark.address.postCode && singlePark.address.postCode + ", "}
            {singlePark.address.city && singlePark.address.city}
            <br />
            <br />
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Monday:`}</span>
              <span>{singlePark.opening_hours.monday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Tuesday:`}</span>
              <span>{singlePark.opening_hours.tuesday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Wednesday:`}</span>
              <span>{singlePark.opening_hours.wednesday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Thursday:`}</span>
              <span>{singlePark.opening_hours.thursday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Friday:`}</span>
              <span>{singlePark.opening_hours.friday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Saturday:`}</span>
              <span>{singlePark.opening_hours.saturday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30%",
              }}
            >
              <span>{`Sunday:`}</span>
              <span>{singlePark.opening_hours.sunday}</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px 0",
              }}
            >
              <span>
                <a href={singlePark.website_url}>Visit Website</a>
              </span>
              <span>
                <a href={`tel:${singlePark.phone_number}`}>
                  {singlePark.phone_number}
                </a>
              </span>
            </li>
          </Typography>
          <ParkReviews reviews={reviews} isLoading={isLoading} />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}
