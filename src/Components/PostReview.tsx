import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReview from "./CreateReview";
import getSinglePark from "../../utils/getSinglePark.utils";
import { LoginContext } from "../Context/loginContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { Park } from "../../types/CustomTypes";

export default function PostReview() {
  const { park_id } = useParams<{ park_id: string }>();
  const [singlePark, setSinglePark] = useState<Park | undefined>(undefined);
  const { type } = useContext(LoginContext);


  useEffect(() => {
    getSinglePark(park_id)
      .then((response) => {
        setSinglePark(response.data);
      })
      .catch((error) => {
        console.log("Error fetching park details", error);
      });
  }, [park_id]);

  return (
    <>
      {type === "consumer" ? (
        singlePark && (
          <CreateReview parkId={park_id} parkName={singlePark.name} />
        )
      ) : (
        <Typography
              variant="body2"
              color="error"
              sx={{
                backgroundColor: "pink",
                textAlign: "center",
                mt: 2,
                border: "solid",
                padding: "0.5rem",
              }}
            >
              Please log in as a customer to post a review
            </Typography>
      )}
    </>
  );
}
