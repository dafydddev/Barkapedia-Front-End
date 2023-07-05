import server from "./Express";
import { PatchReviewResponse, ReviewVoteRequest } from "../types/CustomTypes";

const patchReviewVotes = (reviewRequest: ReviewVoteRequest): Promise<PatchReviewResponse> => {
  const { review_id, increment } = reviewRequest;
  return server.patch(`/reviews/${review_id}/votes`, { increment });
};

export default patchReviewVotes;
