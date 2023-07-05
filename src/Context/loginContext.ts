import { createContext } from "react";
import { LoginContextType } from "../../types/CustomTypes";

export const LoginContext = createContext<LoginContextType>({
  email: null,
  id: null,
  type: null,
  isVerified: null,
  setEmail: (_email: string) => {},
  setId: (_id: string) => {},
  setType: (_type: string) => {},
  setIsVerified: (_isVerified: boolean) => {}
});