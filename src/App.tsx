import Header from "./Components/Header";
import Nav from "./Components/Nav";
import SinglePark from "./Components/SinglePark";
import { Routes, Route } from "react-router-dom";
import ShowParks from "./Components/ShowParks";
import SignIn from "./Components/SignIn";
import { LoginContext } from "./Context/loginContext";
import { useState } from "react";
import Home from "./Components/Home";
import * as React from "react";
import { Park } from "./types/CustomTypes";
import server from "./Api/api";
import { LatLngTuple } from "leaflet";
import CreateNewPark from "./Components/CreateNewPark/CreateNewPark";
import Register from "./Components/Register";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import "./Styles/reset.css";

function App() {
  const [email, setEmail] = useState<string>("");
  const [parks, setParks] = React.useState<Park[]>([]);
  const [queries, setQueries] = React.useState<string>("");
  const [city, setCity] = React.useState("");
  const [mapMarkers, setMapMarkers] = React.useState<
    { position: LatLngTuple; content: string; parkId: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [uniqueParks, setUniqueParks] = React.useState<string[]>(["Any"]);

  const parksURL = "/parks" + queries;
  React.useEffect(() => {
    server.get(parksURL).then(({ data }) => {
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
  }, [parksURL]);

  parks.forEach((park: Park) => {
    if (!uniqueParks.includes(park.address.city)) {
      setUniqueParks([...uniqueParks, park.address.city]);
    }
  });
  return (
    <LoginContext.Provider value={{ email, setEmail }}>
      <Box sx={{ display: "flex", marginLeft: "20px", marginRight: "20px" }}>
        <Stack
          sx={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
          spacing={2}
        >
          <Header />
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  uniqueParks={uniqueParks}
                  setQueries={setQueries}
                  setCity={setCity}
                />
              }
            />
            <Route
              path="/parks"
              element={
                <ShowParks
                  city={city}
                  setQueries={setQueries}
                  parks={parks}
                  mapMarkers={mapMarkers}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/parks/:park_id" element={<SinglePark />} />
            <Route path="/newpark" element={<CreateNewPark />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />}></Route>
          </Routes>
        </Stack>
      </Box>
    </LoginContext.Provider>
  );
}

export default App;
