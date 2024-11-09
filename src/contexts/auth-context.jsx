import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userUuid: "",
  login: () => {},
  logout: () => {},
});