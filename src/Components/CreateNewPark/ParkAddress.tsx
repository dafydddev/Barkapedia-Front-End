import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ParkAddressProps } from "../../types/CustomTypes";

function ParkAddress({ setParkAddress, regex }: ParkAddressProps) {
  const [firstLine, setFirstLine] = React.useState("");
  const [secondLine, setSecondLine] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [city, setCity] = React.useState("");

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFirstLine(event.target.value);
  };
  const handleLine2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSecondLine(event.target.value);
  };
  const handlePostcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPostCode(event.target.value);
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  React.useEffect(() => {
    setParkAddress({
      firstLine: firstLine,
      secondLine: secondLine,
      postCode: postCode,
      city: city,
    });
  }, [firstLine, secondLine, postCode, city]);

  return (
    <>
      <Box>
        <h2>Park address</h2>
        <TextField
          id="street"
          label="street"
          variant="standard"
          onChange={handleStreetChange}
          sx={{ m: 1 }}
        />
        <TextField
          id="line 2"
          label="address line 2"
          variant="standard"
          onChange={handleLine2Change}
          sx={{ m: 1 }}
        />
        <TextField
          error={regex.test(postCode) ? false : true}
          helperText={regex.test(postCode) ? "enter a park name" : null}
          id="post code"
          label="post code"
          required={true}
          variant="standard"
          onChange={handlePostcodeChange}
          sx={{ m: 1 }}
        />
        <TextField
          id="city/town"
          label="city/town"
          variant="standard"
          onChange={handleCityChange}
          sx={{ m: 1 }}
        />
      </Box>
    </>
  );
}
export default ParkAddress;
