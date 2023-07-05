import * as React from "react";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { orderObj } from "../../types/CustomTypes";
import Button from "@mui/material/Button";
import { useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface FiltersProps {
  setQueries: Function;
  city: string;
}

function Filters({ setQueries, city }: FiltersProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function submitFilter(selectedFilter: string) {
    if (selectedFilter === "isFree" && !isFree) setIsFree(true);
    if (selectedFilter === "isFree" && isFree) setIsFree(false);

    if (selectedFilter === "wellLit" && !wellLit) setWellLit(true);
    if (selectedFilter === "wellLit" && wellLit) setWellLit(false);

    if (selectedFilter === "freeParking" && !freeParking) setFreeParking(true);
    if (selectedFilter === "freeParking" && freeParking) setFreeParking(false);

    if (selectedFilter === "anyParking" && !anyParking) setAnyParking(true);
    if (selectedFilter === "anyParking" && anyParking) setAnyParking(false);

    if (selectedFilter === "agility" && !agilityEquipment)
      setAgilityEquipment(true);
    if (selectedFilter === "agility" && agilityEquipment)
      setAgilityEquipment(false);

    if (selectedFilter === "enclosed" && !isEnclosed) setIsEnclosed(true);
    if (selectedFilter === "enclosed" && isEnclosed) setIsEnclosed(false);

    if (selectedFilter === "access" && !disabledAccess) setDisabledAccess(true);
    if (selectedFilter === "access" && disabledAccess) setDisabledAccess(false);
  }

  const [isFree, setIsFree] = useState(false);
  const [wellLit, setWellLit] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const [anyParking, setAnyParking] = useState(false);
  const [agilityEquipment, setAgilityEquipment] = useState(false);
  const [isEnclosed, setIsEnclosed] = useState(false);
  const [disabledAccess, setDisabledAccess] = useState(false);
  const [activeFilters, setActiveFilters] = useState(false);
  const [checkboxes, setCheckboxes] = React.useState({
    isFree: false,
    isWellLit: false,
    isFreeParking: false,
    isParking: false,
    hasAgilityEquipment: false,
    isFullyEnclosed: false,
    hasDisabledAccess: false,
  });

  React.useEffect(() => {
    for (const box in checkboxes) {
      if (checkboxes[box as keyof object] === true) {
        setActiveFilters(true);
        break;
      } else setActiveFilters(false);
    }
  }, [checkboxes]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const [orderParam, setOrderParam] = React.useState("");
  const handleOrderParamChange = (event: SelectChangeEvent) => {
    setOrderParam(event.target.value);
  };

  const [order, setOrder] = React.useState("");
  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  const handleReset = () => {
    setOrderParam("");
    setOrder("");
    setCheckboxes({
      isFree: false,
      isWellLit: false,
      isFreeParking: false,
      isParking: false,
      hasAgilityEquipment: false,
      isFullyEnclosed: false,
      hasDisabledAccess: false,
    });
    setFreeParking(false);
    setAgilityEquipment(false);
    setAnyParking(false);
    setIsEnclosed(false);
    setDisabledAccess(false);
    setWellLit(false);
    setIsFree(false);
  };

  const orderObj: orderObj = {
    order: order,
    orderParam: orderParam,
  };

  let queryString = `${city}`;

  for (const checkbox in checkboxes) {
    if (checkboxes[checkbox as keyof object] === true) {
      queryString += `${queryString.length === 0 ? "?" : "&"}${checkbox}=true`;
    }
  }

  if (orderObj.orderParam !== "") {
    queryString += `${queryString.length === 0 ? "?" : "&"}orderBy=${
      orderObj.orderParam
    }`;
  }

  if (orderObj.order !== "") {
    queryString += `:${orderObj.order}`;
  }
  React.useEffect(() => {
    setQueries(queryString);
  }, [queryString]);

  function removeFilter(filter: string) {
    if (filter === "isFree") {
      setIsFree(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        isFree: false,
      }));
    }
    if (filter === "wellLit") {
      setWellLit(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        isWellLit: false,
      }));
    }
    if (filter === "freeParking") {
      setFreeParking(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        isFreeParking: false,
      }));
    }
    if (filter === "anyParking") {
      setAnyParking(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        isParking: false,
      }));
    }
    if (filter === "isEnclosed") {
      setIsEnclosed(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        isFullyEnclosed: false,
      }));
    }
    if (filter === "agilityEquipment") {
      setAgilityEquipment(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        hasAgilityEquipment: false,
      }));
    }
    if (filter === "disabledAccess") {
      setDisabledAccess(false);
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        hasDisabledAccess: false,
      }));
    }
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <div>
        <CardActions disableSpacing>
          <CardHeader title="Filters" />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show Filters"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        {activeFilters === true ? (
          <CardContent>
            {isFree && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("isFree")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Free Entry&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {wellLit && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("wellLit")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Well Lit&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {freeParking && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("freeParking")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Free Parking&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {anyParking && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("anyParking")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Parking&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {isEnclosed && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("isEnclosed")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Fully Enclosed&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {agilityEquipment && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("agilityEquipment")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Agility Equipment&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
            {disabledAccess && (
              <Button
                className="filter-button"
                variant="outlined"
                onClick={() => removeFilter("disabledAccess")}
                sx={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Mobility Accessible&nbsp;<CancelIcon></CancelIcon>
              </Button>
            )}
          </CardContent>
        ) : null}
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.isFree}
                  onChange={handleCheckboxChange}
                  name="isFree"
                  onClick={() => {
                    submitFilter("isFree");
                  }}
                />
              }
              label="Free Entry"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.isWellLit}
                  onChange={handleCheckboxChange}
                  name="isWellLit"
                  onClick={() => {
                    submitFilter("wellLit");
                  }}
                />
              }
              label="Well Lit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.isFreeParking}
                  onChange={handleCheckboxChange}
                  name="isFreeParking"
                  onClick={() => {
                    submitFilter("freeParking");
                  }}
                />
              }
              label="Free Parking"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.isParking}
                  onChange={handleCheckboxChange}
                  name="isParking"
                  onClick={() => {
                    submitFilter("anyParking");
                  }}
                />
              }
              label="Parking Available"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.hasAgilityEquipment}
                  onChange={handleCheckboxChange}
                  name="hasAgilityEquipment"
                  onClick={() => {
                    submitFilter("agility");
                  }}
                />
              }
              label="Agility Equipment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.isFullyEnclosed}
                  onChange={handleCheckboxChange}
                  name="isFullyEnclosed"
                  onClick={() => {
                    submitFilter("enclosed");
                  }}
                />
              }
              label="Fully Enclosed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxes.hasDisabledAccess}
                  onChange={handleCheckboxChange}
                  name="hasDisabledAccess"
                  onClick={() => {
                    submitFilter("access");
                  }}
                />
              }
              label="	Mobility Accessible"
            />

            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Sort-By">Sort By</InputLabel>
                <Select
                  labelId="sortByParam"
                  id="sortByParam"
                  value={orderParam}
                  label="Sort By"
                  onChange={handleOrderParamChange}
                >
                  <MenuItem value={"name"}>Park Name</MenuItem>
                  <MenuItem value={"current_average_rating"}>
                    Average Rating
                  </MenuItem>
                  <MenuItem value={"size"}>Park Size</MenuItem>
                  <MenuItem value={"current_review_count"}>
                    Number of Reviews
                  </MenuItem>
                </Select>
              </FormControl>
              {orderParam !== "" ? (
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="Order_by">Order</InputLabel>
                  <Select
                    labelId="sortBy"
                    id="sortBy"
                    value={order}
                    label="Order"
                    onChange={handleOrderChange}
                  >
                    <MenuItem value={"asc"}>Ascending</MenuItem>
                    <MenuItem value={"desc"}>Descending</MenuItem>
                  </Select>
                </FormControl>
              ) : null}
            </div>
          </FormGroup>
          <Button variant="contained" onClick={handleReset}>
            Reset Filters
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Filters;
