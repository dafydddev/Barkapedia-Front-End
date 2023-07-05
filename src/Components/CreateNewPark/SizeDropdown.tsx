import { InputLabel, MenuItem, FormControl, ListItemText } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ParkSizeProps } from "../../../types/CustomTypes";

function SizeDropdown({ parkSize, setParkSize }: ParkSizeProps) {
  const sizes = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5+",
    },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setParkSize(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 2, width: "90%" }}>
      <InputLabel id="park size">park size</InputLabel>
      <Select
        labelId="park size"
        id="park size"
        onChange={handleChange}
        label="size"
        value={`${parkSize}`}
      >
        {sizes.map((size) => {
          return (
            <MenuItem key={size.label} value={size.value}>
              <ListItemText primary={`${size.label}`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SizeDropdown;
