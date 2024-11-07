import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  access_token: null,
  login: () => {},
  logout: () => {},
});
