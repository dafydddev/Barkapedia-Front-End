import server from "./Express";
import { ReviewData } from "../types/CustomTypes";

export function postReview(reviewData: ReviewData) {
  return server
    .post("/reviews", reviewData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting review:", error);
      throw error;
    });
}

export default postReview;
