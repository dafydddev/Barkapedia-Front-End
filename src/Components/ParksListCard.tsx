import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ParksListCardProps } from "../types/CustomTypes";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import "../Styles/card-list.css";

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

export default function ParksListCard({ park }: ParksListCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!park) {
    return <p>Loading...</p>;
  }

  return (
    <Card sx={{ maxWidth: "850px", margin:"0 auto" }}>
      <Link className="card-text" key={park.id} to={park.id}>
        <CardHeader title={park.name} />
        <CardContent>
          <StarRating
            rating={park.current_average_rating}
            reviewCount={park.current_review_count}
          />
        </CardContent>
        <CardMedia
          component="img"
          height="194"
          image={park.image_url}
          alt={park.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {park.desc}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Link key={park.id} className="card-text" to={park.id}>
          <CardContent>
            <Typography paragraph>Opening Hours</Typography>
            <ul className="cards">
              <li>{`Monday: ${park.opening_hours.monday}`}</li>
              <li>{`Tuesday: ${park.opening_hours.tuesday}`}</li>
              <li>{`Wednesday: ${park.opening_hours.wednesday}`}</li>
              <li>{`Thursday: ${park.opening_hours.thursday}`}</li>
              <li>{`Friday: ${park.opening_hours.friday}`}</li>
              <li>{`Saturday: ${park.opening_hours.saturday}`}</li>
              <li>{`Sunday: ${park.opening_hours.sunday}`}</li>
            </ul>
          </CardContent>
        </Link>
      </Collapse>
    </Card>
  );
}
