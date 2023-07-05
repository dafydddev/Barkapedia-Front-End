import Nav from "./Components/Nav";
import SinglePark from "./Components/SinglePark";
import { Routes, Route } from "react-router-dom";
import ShowParks from "./Components/ShowParks";
import SignIn from "./Components/SignIn";
import { LoginContext } from "./Context/loginContext";
import { useState } from "react";
import Home from "./Components/Home";
import * as React from "react";
import { Park } from "../types/CustomTypes";
import server from "../utils/Express";
import { LatLngTuple } from "leaflet";
import PostReview from "./Components/PostReview";
import Register from "./Components/Register";
import Box from "@mui/material/Box";
import AboutUs from "./Components/About"
import CreateNewPark from "./Components/CreateNewPark/CreateNewPark";
import { Stack } from "@mui/system";
import "./Styles/reset.css";

function App() {
  const [email, setEmail] = useState(null);
  const [parks, setParks] = React.useState<Park[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [type, setType] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [queries, setQueries] = React.useState<string>("");
  const [city, setCity] = React.useState("");
  const [mapMarkers, setMapMarkers] = React.useState<
    { position: LatLngTuple; content: string; parkId: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [uniqueParks, setUniqueParks] = React.useState<string[]>(["Any"]);
  const [forceGetParks, setForceGetParks] = React.useState(true);

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
  }, [parksURL, forceGetParks]);

  parks.forEach((park: Park) => {
    if (!uniqueParks.includes(park.address.city)) {
      setUniqueParks([...uniqueParks, park.address.city]);
    }
  });
  return (

    <LoginContext.Provider value={{ email, id, type, setEmail, setId, setType, setIsVerified, isVerified }}>

      <Box
        sx={{
          display: "flex",
          fontFamily: "Helvetica",
        }}
      >
        <Stack
          sx={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
          spacing={2}
        >
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
            <Route
              path="/newpark"
              element={
                <CreateNewPark
                  parks={parks}
                  setForceGetParks={setForceGetParks}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn setId={setId} />}></Route>
            <Route
              path="/parks/:park_id/post-review"
              element={<PostReview />}
            ></Route>
            <Route path="/about" element={<AboutUs />}>
            </Route>
          </Routes>
        </Stack>
      </Box>
    </LoginContext.Provider>
  );
}

export default App;
