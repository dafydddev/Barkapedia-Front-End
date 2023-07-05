import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FeaturesDropdown from "./FeaturesDropdown";
import ParkAddress from "./ParkAddress";
import SizeDropdown from "./SizeDropdown";
import OpeningTimes from "./OpeningTimes";
import { Button } from "@mui/material";
import postPark from "../../../utils/postPark";

import {
  CreateNewParkProps,
  ParkSubmissionObject,
} from "../../../types/CustomTypes";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";

function CreateNewPark({ parks, setForceGetParks }: CreateNewParkProps) {
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
  const [parkNameChange, setParkNameChange] = React.useState(false);

  const { id } = React.useContext(LoginContext);
  const { type } = React.useContext(LoginContext);
  const { isVerified } = React.useContext(LoginContext);

  const verified = isVerified;
  const accountType = type;
  const user_id = id;

  const navigate = useNavigate();

  const handleParkNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParkNameChange(true);
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
    if (
      parkName.length > 0 &&
      regex.test(parkAddress.postCode) &&
      parkAddress.city.length > 0
    ) {
      setSubmissionAllowed(true);
    } else {
      setSubmissionAllowed(false);
    }
  }, [parkName, parkAddress.postCode]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const namesArr = parks.map((park) => {
      return park.name;
    });
    const postCodesArr = parks.map((park) => {
      return park.address.postCode;
    });

    if (
      namesArr.includes(submissionObj.name) &&
      postCodesArr.includes(submissionObj.address.postCode)
    ) {
      alert("park already exists!");
      window.location.reload();

      throw "park already exists";
    }

    setLoading(true);
    postPark(submissionObj)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .then((res) => {
        setForceGetParks((currState: boolean) => {
          return currState === true ? false : true;
        });
        return res;
      })
      .then((res) => {
        alert("Park created successsfully!");
        navigate(`/parks/${res.data.id}`);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ fontSize: "1.2em" }}>Add a new park</Box>

          {(verified === true && type === "consumer") || type === "business" ? (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "90%",
                maxWidth: "900px",
              }}
              autoComplete="on"
            >
              <TextField
                error={parkName.length < 1 && parkNameChange ? true : false}
                helperText={
                  parkName.length < 1 && parkNameChange
                    ? "enter a park name"
                    : null
                }
                id="parkName"
                label="park name"
                variant="standard"
                required
                sx={{ m: 2, width: "90%" }}
                onChange={handleParkNameChange}
              />

              <TextField
                sx={{ m: 2, width: "90%" }}
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
              <TextField
                id="imageUrl"
                label="image url"
                variant="standard"
                onChange={handleImageUrlChange}
                sx={{ m: 2, width: "90%" }}
              />
              <ParkAddress setParkAddress={setParkAddress} regex={regex} />
              <OpeningTimes setOpeningTimes={setOpeningTimes} />

              {/* <AddPhoto /> */}

              {accountType === "business" ? (
                <Box
                  sx={{
                    width: "100%",
                    borderTop: 1,
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="website URL"
                    label="website URL"
                    variant="standard"
                    onChange={handleWebsiteUrlChange}
                    sx={{ width: "40%", m: 2 }}
                  />
                  <TextField
                    id="phone number"
                    label="phone number"
                    variant="standard"
                    onChange={handlePhoneNumberChange}
                    sx={{ width: "40%", m: 2 }}
                  />
                </Box>
              ) : null}
              <Button
                disabled={submissionAllowed === false ? true : false}
                variant="contained"
                id="submit"
                type="submit"
                onClick={handleSubmit}
                sx={{ m: 3, width: "40%" }}
              >
                Submit
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "60%",
                m: 4,
              }}
            >
              You must be signed in and verified to add a new park
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default CreateNewPark;
