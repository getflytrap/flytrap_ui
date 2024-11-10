import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userUuid: string | null;
  login: (uuid: string) => void;
  logout: () => void;
};

// export const AuthContext = createContext({
//   isLoggedIn: false,
//   userUuid: "",
//   login: () => {},
//   logout: () => {},
// });

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userUuid, setUserUuid] = useState<string | null>(null);

  const login = (uuid: string) => {
    setUserUuid(uuid);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserUuid(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userUuid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
