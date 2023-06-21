import { createContext } from "react";

export const LoginContext = createContext({
  email: "",
  setEmail: (_email: string) => {},
});
