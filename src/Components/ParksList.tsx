import ParksListCard from "./ParksListCard";
import { ParksListProps } from "../../types/CustomTypes";
import "../Styles/card-list.css";
import "../Styles/styles.css"
import { Grid } from "@mui/material";

function ParksList({ parks, isLoading }: ParksListProps) {
  return (
    <>
      <h2>All Parks</h2>
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
      <Grid sx={{ display: "flex", flexDirection: {xs: "column", sm:"row", md:"row"}, alignItems:"center", justifyContent:"center", flexWrap: "wrap" }}>
        {parks.map((park) => {
          return (
            <Grid sx={{margin:{ sm: "10px"}, width: {xs: "100%", sm: "42vw"}, maxWidth:"300px"}} key={park.id} className="card">
              <ParksListCard park={park} parks={parks} fullWidth={true} />
            </Grid>
          );
        })}
      </Grid>
      )}
    </>
  );
}

export default ParksList;


