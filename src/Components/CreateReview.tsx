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
import { postReview, ReviewData } from "../utils/postReview.utils";

import "../Styles/post-review.css";

interface CreateReviewProps {
  parkId: string;
  parkName: string;
}

export default function CreateReview({ parkId, parkName }: CreateReviewProps) {
  const [AsDescribed, setAsDescribed] = React.useState("Yes");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [clientValidation, setClientValidation] = useState("");
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [safety, setSafety] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { email } = useContext(LoginContext)

  React.useEffect(() => {
    checkFormCompletion();
  }, [rating, safety]);

  function handleRatingClick(value) {
    setRating(value);
  }

  function handleSecurityClick(value) {
    setSafety(value);
  }

  function checkFormCompletion() {
    if (rating !== null && safety !== null) {
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

    setButtonDisabled(true)

    const reviewData: ReviewData = {
      park_id: parkId,
      rating: rating,
      safety: safety,
      AsDescribed: AsDescribed,
      title: commentTitle,
      body: commentBody,
      username: email,
      votes: 0,

    }

    postReview(reviewData)
    .then(() => {
      navigate(`/parks/${parkId}`)
    })
    .catch(error => {
      setSubmitError('Error posting review. Please try again later.');
      setButtonDisabled(false);
    })
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAsDescribed: string
  ) => {
    setAsDescribed(newAsDescribed);
  };

  return (
    <Card sx={{ width: "70%", margin: "auto", marginTop: "100px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "2em" }}>
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
            <Typography>How was this park?</Typography>
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
            <Typography>How safe was this park?</Typography>
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
            <br />
            <Typography>Was this park as described?</Typography>
            <ToggleButtonGroup
              color="primary"
              value={AsDescribed}
              exclusive
              onChange={handleChange}
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
                sx={{ mt: 3, mb: 2 }}
              >
                Post Review
              </Button>
            )}
          </form>
        </CardContent>
      </CardContent>
    </Card>
  );
}
