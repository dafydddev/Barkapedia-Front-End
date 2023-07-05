import server from "./Express";

export default function getReviews(park_id: string | undefined) {
  return server
    .get(`reviews/${park_id}/parks`)
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}