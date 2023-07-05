import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessIcon from "@mui/icons-material/Business";

import {
  PatchReviewResponse,
  SingleReviewProps,
  User,
  VoteValue,
} from "../../types/CustomTypes";
import "../Styles/styles.css";
import { useState, useEffect } from "react";
import patchReviewVotes from "../../utils/patchReviewVotes.utils";
import getUserByID from "../../utils/getUserByID.utils";

export default function SingleReview({ review, fullWidth }: SingleReviewProps) {
  if (!review) {
    return <h3 className="loading">Loading...</h3>;
  }

  const [userData, setUserData] = useState<User | undefined>();
  const [showVerifiedIcon, setShowVerifiedIcon] = useState<boolean>(false);
  const [showBusinessIcon, setShowBusinessIcon] = useState<boolean>(false);
  const [vote, setVote] = useState<VoteValue>(null);
  const [voteCount, setVoteCount] = useState<number>(review.votes);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getUserByID(review.user_id).then((user) => setUserData(user));
  }, []);

  useEffect(() => {
    if (userData) {
      setShowVerifiedIcon(userData.isVerified);
      setShowBusinessIcon(userData.type === "Business");
    }
  }, [userData]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newVote: VoteValue
  ) => {
    setIsDisabled(true);
    if (newVote === null) {
      setVote(vote);
      setIsDisabled(false);
      return;
    }
    const increment = newVote;
    const reviewRequest = { review_id: review.id, increment };
    patchReviewVotes(reviewRequest)
      .then((response: PatchReviewResponse) => {
        setVote(newVote);
        setVoteCount(response.data.votes);
      })
      .then(() => {
        if ((newVote === 1 && vote === -1) || (newVote === -1 && vote === 1)) {
          return patchReviewVotes(reviewRequest).then(
            (response: PatchReviewResponse) => {
              setVoteCount(response.data.votes);
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <Card sx={{ maxWidth: fullWidth ? "100%" : 345 }}>
      <CardHeader
        title={review.title}
        subheader={
          <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
            {review.username}
            {showVerifiedIcon && (
              <VerifiedIcon
                aria-hidden={false}
                aria-label="Verified user"
                color="primary"
              />
            )}
            {showBusinessIcon && (
              <BusinessIcon
                aria-hidden={false}
                aria-label="Business User"
                color="primary"
              />
            )}
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {review.body}
        </Typography>
        <ToggleButtonGroup
          value={vote}
          exclusive
          onChange={handleChange}
          aria-label="vote"
        >
          <ToggleButton value={1} aria-label="upvote" disabled={isDisabled}>
            <ThumbUpIcon />
          </ToggleButton>
          <ToggleButton value={-1} aria-label="downvote" disabled={isDisabled}>
            <ThumbDownIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="body2" color="text.secondary">
          Vote count: {voteCount}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
