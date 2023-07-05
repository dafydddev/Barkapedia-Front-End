import server from "./Express";
import { User } from "../types/CustomTypes";

const getUserByID = (user_id: string): Promise<User> => {
  return server
    .get(`users/${user_id}`)
    .then((userData) => {
      return userData.data;
    })
    .catch((err) => err);
};

export default getUserByID;
