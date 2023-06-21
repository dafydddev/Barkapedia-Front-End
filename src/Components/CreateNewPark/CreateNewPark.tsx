import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FeaturesDropdown from "./FeaturesDropdown";
import ParkAddress from "./ParkAddress";
import SizeDropdown from "./SizeDropdown";
import OpeningTimes from "./OpeningTimes";
import { Grid, Button } from "@mui/material";
import postPark from "../../utils/postPark";
import { ParkSubmissionObject } from "../../types/CustomTypes";
import { useNavigate } from "react-router-dom";
// import AddPhoto from "./AddPhoto";

function CreateNewPark() {
  const [parkName, setParkName] = React.useState("");
  const [parkSize, setParkSize] = React.useState("");
  const [parkDescription, setParkDescription] = React.useState("");
  const [openingTimes, setOpeningTimes] = React.useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const [parkFeatures, setParkFeatures] = React.useState({
    isFree: false,
    isWellLit: false,
    isFreeParking: false,
    isParking: false,
    hasAgilityEquipment: false,
    isFullyEnclosed: false,
    hasDisabledAccess: false,
  });
  const [parkAddress, setParkAddress] = React.useState({
    firstLine: "",
    secondLine: "",
    postCode: "",
    city: "",
  });
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [image_url, setImageUrl] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submissionAllowed, setSubmissionAllowed] = React.useState(false);

  const verified = true;
  const business = true;
  const user_id = "user_1";

  const navigate = useNavigate();

  const handleParkNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParkName(event.target.value);
  };
  const handleParkDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParkDescription(event.target.value);
  };
  const handleWebsiteUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWebsiteUrl(event.target.value);
  };
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };
  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const submissionObj: ParkSubmissionObject = {
    user_id: user_id,
    name: parkName,
    desc: parkDescription,
    size: +parkSize,
    features: { ...parkFeatures },
    opening_hours: { ...openingTimes },
    address: { ...parkAddress },
    image_url: image_url,
    website_url: websiteUrl,
    phone_number: phoneNumber,
  };

  const regex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  React.useEffect(() => {
    if (parkName.length > 0 && regex.test(parkAddress.postCode)) {
      setSubmissionAllowed(true);
    } else {
      setSubmissionAllowed(false);
    }
  }, [parkName, parkAddress.postCode]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    setLoading(true);
    event.preventDefault();
    postPark(submissionObj)
      .then((res: any) => {
        setLoading(false);
        alert("Park created successsfully!");
        navigate(`/parks/${res.data.id}`);
      })
      .catch((err) => {
        alert("Error- Please try again!");
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <h1>Add a new park</h1>
          {verified === true ? (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="on"
            >
              <Box sx={{ m: 2 }}>
                <TextField
                  error={parkName.length < 1 ? true : false}
                  helperText={parkName.length < 1 ? "enter a park name" : null}
                  id="parkName"
                  label="park name"
                  variant="standard"
                  required
                  sx={{ m: 2, width: "50ch" }}
                  onChange={handleParkNameChange}
                />

                <TextField
                  sx={{ m: 2, width: "50ch" }}
                  id="parkDescription"
                  label="park description"
                  variant="standard"
                  multiline
                  minRows={1}
                  maxRows={6}
                  onChange={handleParkDescriptionChange}
                />
                <SizeDropdown parkSize={parkSize} setParkSize={setParkSize} />
                <FeaturesDropdown setParkFeatures={setParkFeatures} />
                <ParkAddress setParkAddress={setParkAddress} regex={regex} />
                <TextField
                  id="imageUrl"
                  label="image url"
                  variant="standard"
                  onChange={handleImageUrlChange}
                />
                {/* <AddPhoto /> */}
              </Box>

              {business === true ? (
                <Box>
                  <OpeningTimes setOpeningTimes={setOpeningTimes} />

                  <Box>
                    <TextField
                      id="website URL"
                      label="website URL"
                      variant="standard"
                      onChange={handleWebsiteUrlChange}
                    />
                    <TextField
                      id="phone number"
                      label="phone number"
                      variant="standard"
                      onChange={handlePhoneNumberChange}
                    />
                  </Box>
                </Box>
              ) : null}
              <Button
                disabled={submissionAllowed === false ? true : false}
                variant="contained"
                id="submit"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          ) : (
            <p>You must be signed in and verified to post add a new park</p>
          )}
        </Grid>
      )}
    </>
  );
}

export default CreateNewPark;
