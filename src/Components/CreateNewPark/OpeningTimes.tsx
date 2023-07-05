import { OpeningTimesProps } from "../../../types/CustomTypes";
import * as React from "react";
import { TextField, Box } from "@mui/material";

function OpeningTimes({ setOpeningTimes }: OpeningTimesProps) {
  const [monday, setMonday] = React.useState("");
  const [tuesday, setTuesday] = React.useState("");
  const [wednesday, setWednesday] = React.useState("");
  const [thursday, setThursday] = React.useState("");
  const [friday, setFriday] = React.useState("");
  const [saturday, setSaturday] = React.useState("");
  const [sunday, setSunday] = React.useState("");

  const handleMondayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonday(event.target.value);
  };
  const handleTuesdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTuesday(event.target.value);
  };
  const handleWednesdayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWednesday(event.target.value);
  };
  const handleThursdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThursday(event.target.value);
  };
  const handleFridayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFriday(event.target.value);
  };
  const handleSaturdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaturday(event.target.value);
  };
  const handleSundayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSunday(event.target.value);
  };
  React.useEffect(() => {
    setOpeningTimes({
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    });
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          m: 3,
        }}
      >
        <Box sx={{ fontSize: "1.2em" }}>Opening Times</Box>

        <TextField
          id="mondayOpening"
          label="Monday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleMondayChange}
        />
        <TextField
          id="tuesdayOpening"
          label="Tuesday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleTuesdayChange}
        />
        <TextField
          id="wednesdayOpening"
          label="Wednesday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleWednesdayChange}
        />
        <TextField
          id="thursdayOpening"
          label="Thursday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleThursdayChange}
        />
        <TextField
          id="fridayOpening"
          label="Friday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleFridayChange}
        />
        <TextField
          id="saturdayOpening"
          label="Saturday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleSaturdayChange}
        />
        <TextField
          id="sundayOpening"
          label="Sunday"
          variant="standard"
          sx={{ m: 1 }}
          onChange={handleSundayChange}
        />
      </Box>
    </>
  );
}

export default OpeningTimes;
