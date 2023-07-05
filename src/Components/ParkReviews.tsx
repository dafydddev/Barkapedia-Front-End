import { ReviewProps } from "../../types/CustomTypes";
import SingleReview from "./SingleReview";
import "../Styles/card-list.css";
import "../Styles/styles.css";
import { Card, Typography } from "@mui/material";

export default function ParkReviews({ reviews, isLoading }: ReviewProps) {
  if (isLoading) {
    return <h3 className="loading">Loading...</h3>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}
      >
        <Typography>No reviews available</Typography>
      </Card>
    );
  }

  return (
    <>
      {reviews.map((review, index) => {
        if (review.body !== "") {
          return (
            <li className="card-list" key={index}>
              <SingleReview review={review} fullWidth={true} />
            </li>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
