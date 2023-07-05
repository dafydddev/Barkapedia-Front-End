import server from "./Express";

function getSinglePark(park_id: string | undefined) {
  return server
    .get(`parks/${park_id}`)
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}

export default getSinglePark;
