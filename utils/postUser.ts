import server from "./Express";
import { UserRequest } from "../types/CustomTypes";

export default function postUser(user: UserRequest) {
  return server.post("/users", user).then((_result) => {});
}
