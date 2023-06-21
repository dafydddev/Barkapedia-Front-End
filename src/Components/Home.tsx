import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { HomeProps } from "../types/CustomTypes";
import { Stack, Link } from "@mui/material";
import { useContext } from "react";
import { LoginContext } from "../Context/loginContext";

function Home({ uniqueParks, setQueries, setCity }: HomeProps) {
  const [value, setValue] = React.useState<string | null>(uniqueParks[0]);
  const [inputValue, setInputValue] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    setQueries(value);
    setCity(value);
    navigate(`/parks`);
  };
  const { email } = useContext(LoginContext);

  return (
    <Stack
      sx={{ justifyContent: "center", alignItems: "center", height: "75%" }}
    >
      <Autocomplete
        onChange={(_event: any, newValue: string | null) => {
          setValue(newValue === "Any" ? "" : `?city=${newValue}`);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="city-dropdown"
        options={uniqueParks}
        sx={{
          width: "75%",
          maxWidth: "700px",
          borderRadius: "5px",
          outline: "none"
        }}
        renderInput={(params) => <TextField variant="standard" {...params} label="Choose city" />}
      />
      <Button
        sx={{
          width:"75%",
          maxWidth: "700px",
          padding: "10px",
          marginTop: "20px",
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        Go
      </Button>
         {!email && <Link href="signin">Sign In</Link>}
    </Stack>
  );
}

export default Home;
