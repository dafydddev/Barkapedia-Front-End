import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FeaturesDropDownProps } from "../../../types/CustomTypes";

function FeaturesDropdown({ setParkFeatures }: FeaturesDropDownProps) {
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const features = [
    "Free Entry",
    "Well Lit",
    "Free Parking",
    "Parking Available",
    "Agility Equipment",
    "Fully Enclosed",
    "Mobilty Access",
  ];
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);

  const featureObj = {
    isFree: false,
    isWellLit: false,
    isFreeParking: false,
    isParking: false,
    hasAgilityEquipment: false,
    isFullyEnclosed: false,
    hasDisabledAccess: false,
  };

  React.useEffect(() => {
    if (selectedFeatures.includes("Free Entry")) {
      featureObj.isFree = true;
    }
    if (selectedFeatures.includes("Well Lit")) {
      featureObj.isWellLit = true;
    }
    if (selectedFeatures.includes("Free Parking")) {
      featureObj.isFreeParking = true;
    }
    if (selectedFeatures.includes("Parking Available")) {
      featureObj.isParking = true;
    }
    if (selectedFeatures.includes("Fully Enclosed")) {
      featureObj.isFullyEnclosed = true;
    }
    if (selectedFeatures.includes("Mobility Access")) {
      featureObj.hasDisabledAccess = true;
    }
    if (selectedFeatures.includes("Agility Equipment")) {
      featureObj.hasAgilityEquipment = true;
    }

    setParkFeatures(featureObj);
  }, [selectedFeatures]);

  const handleChange = (event: SelectChangeEvent<typeof selectedFeatures>) => {
    const {
      target: { value },
    } = event;
    setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 2, width: "90%" }}>
      <InputLabel id="featuresCheckbox">features</InputLabel>
      <Select
        labelId="featuresCheckbox"
        id="featuresCheckbox"
        multiple
        value={selectedFeatures}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {features.map((feature) => (
          <MenuItem key={feature} value={feature}>
            <Checkbox checked={selectedFeatures.indexOf(feature) > -1} />
            <ListItemText primary={feature} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FeaturesDropdown;
