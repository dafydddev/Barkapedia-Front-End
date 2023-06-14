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
import { Park } from "../../types/CustomTypes";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";

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

interface ParksListCardProps {
  park: Park;
}

export default function ParksListCard({ park }: ParksListCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const averageRating = park.current_average_rating;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={park.name} />
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="read-only"
          value={Number(averageRating.toFixed(1))}
          readOnly
          precision={0.1}
        />
        <Box>{park.current_average_rating}</Box>
      </Box>

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
        <CardContent>
          <Typography paragraph>Opening Hours</Typography>
          <ul>
            <li>{`Monday: ${park.opening_hours.monday}`}</li>
            <li>{`Tuesday: ${park.opening_hours.tuesday}`}</li>
            <li>{`Wednesday: ${park.opening_hours.wednesday}`}</li>
            <li>{`Thursday: ${park.opening_hours.thursday}`}</li>
            <li>{`Friday: ${park.opening_hours.friday}`}</li>
            <li>{`Saturday: ${park.opening_hours.saturday}`}</li>
            <li>{`Sunday: ${park.opening_hours.sunday}`}</li>
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
}