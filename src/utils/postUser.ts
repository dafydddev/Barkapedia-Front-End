import server from "../Api/api";

export default function postUser(user: any) {
  return server.post("/users", user).then((result) => {
    console.log(result)
  });
}
