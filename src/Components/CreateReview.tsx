import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { LoginContext } from "../Context/loginContext";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MdSentimentVerySatisfied } from "react-icons/md";
import { MdSentimentSatisfied } from "react-icons/md";
import { MdSentimentNeutral } from "react-icons/md";
import { MdSentimentDissatisfied } from "react-icons/md";
import { MdSentimentVeryDissatisfied } from "react-icons/md";
import { postReview } from "../../utils/postReview.utils";

import "../Styles/post-review.css";
import { ReviewData } from "../../types/CustomTypes";

interface CreateReviewProps {
  parkId: string | undefined;
  parkName: string;
}

export default function CreateReview({ parkId, parkName }: CreateReviewProps) {
  const [AsDescribed, setAsDescribed] = React.useState<boolean | null>(null);
  const [toggle, setToggle] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [clientValidation, setClientValidation] = useState("");
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);
  const [safety, setSafety] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { id } = useContext(LoginContext);

  React.useEffect(() => {
    checkFormCompletion();
  }, [rating, safety, toggle]);

  function handleRatingClick(value: number) {
    setRating(value);
  }

  function handleSecurityClick(value: number) {
    setSafety(value);
  }

  function checkFormCompletion() {
    if (rating !== null && safety !== null && toggle !== "") {
      setIsFormVisible(true);
    } else {
      setIsFormVisible(false);
    }
  }

  const handleTitleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCommentTitle(value);
  };

  const handleBodyFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCommentBody(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      (commentTitle.trim() !== "" && commentBody.trim() === "") ||
      (commentTitle.trim() === "" && commentBody.trim() !== "")
    ) {
      setClientValidation(
        "Please fill in both the title and body fields, or leave them both empty."
      );
      return;
    }

    setButtonDisabled(true);

    const reviewData: ReviewData = {
      park_id: parkId,
      user_id: id,
      rating: rating,
      safety: safety,
      AsDescribed: AsDescribed,
      title: commentTitle,
      body: commentBody,
    };
    
    postReview(reviewData)
      .then(() => {
        navigate(`/parks/${parkId}`);
      })
      .catch(() => {
        setSubmitError("Error posting review. Please try again later.");
        setButtonDisabled(false);
      });
  };

  const handleAsDescribedChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAsDescribed: string
  ) => {
    setToggle(newAsDescribed);
    setAsDescribed(newAsDescribed === "Yes" ? true : false);
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        overflowY: "auto",
        maxHeight: "100vh",
        minWidth: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "2em", paddingLeft: "1em", display: "flex", paddingRight: "1em", textAlign: "center" }}
        >
          Post Review for {parkName}
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography>How was this park? *</Typography>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdSentimentVeryDissatisfied
                onClick={() => handleRatingClick(1)}
                className={`icon${rating === 1 ? 1 : "default"} icon-large`}
              />
              <MdSentimentDissatisfied
                onClick={() => handleRatingClick(2)}
                className={`icon${rating === 2 ? 2 : "default"} icon-large`}
              />
              <MdSentimentNeutral
                onClick={() => handleRatingClick(3)}
                className={`icon${rating === 3 ? 3 : "default"} icon-large`}
              />
              <MdSentimentSatisfied
                onClick={() => handleRatingClick(4)}
                className={`icon${rating === 4 ? 4 : "default"} icon-large`}
              />
              <MdSentimentVerySatisfied
                onClick={() => handleRatingClick(5)}
                className={`icon${rating === 5 ? 5 : "default"} icon-large`}
              />
            </CardContent>
            <Typography>How safe was this park? *</Typography>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdSentimentVeryDissatisfied
                onClick={() => handleSecurityClick(1)}
                className={`icon${safety === 1 ? 1 : "default"} icon-large`}
              />
              <MdSentimentDissatisfied
                onClick={() => handleSecurityClick(2)}
                className={`icon${safety === 2 ? 2 : "default"} icon-large`}
              />
              <MdSentimentNeutral
                onClick={() => handleSecurityClick(3)}
                className={`icon${safety === 3 ? 3 : "default"} icon-large`}
              />
              <MdSentimentSatisfied
                onClick={() => handleSecurityClick(4)}
                className={`icon${safety === 4 ? 4 : "default"} icon-large`}
              />
              <MdSentimentVerySatisfied
                onClick={() => handleSecurityClick(5)}
                className={`icon${safety === 5 ? 5 : "default"} icon-large`}
              />
            </CardContent>
            <br />
            <Typography>Was this park as described? *</Typography>
            <br />
            <ToggleButtonGroup
              color="primary"
              value={toggle}
              exclusive
              onChange={handleAsDescribedChange}
              aria-label="Platform"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ToggleButton value="Yes">Yes</ToggleButton>
              <ToggleButton value="No">No</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <Typography>
              Write a few words about your experience at {parkName}
            </Typography>
            <TextField
              margin="normal"
              id="outlined"
              label="Title"
              defaultValue=""
              autoFocus
              fullWidth
              onChange={handleTitleFieldChange}
            />
            <TextField
              margin="normal"
              id="outlined-multiline-flexible"
              multiline
              maxRows={10}
              label="Body"
              defaultValue=""
              autoFocus
              fullWidth
              onChange={handleBodyFieldChange}
            />
            {isFormVisible && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={buttonDisabled}
              >
                Post Review
              </Button>
            )}
            {submitError && (
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
                {submitError}
              </Typography>
            )}
            {clientValidation !== "" && (
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
                {clientValidation}
              </Typography>
            )}
          </form>
        </CardContent>
      </CardContent>
    </Card>
  );
}
