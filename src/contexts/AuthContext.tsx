import { createContext, useState, ReactNode, useEffect } from "react";
import { logout as logoutService, checkAuthStatus } from "../services";
import { useWebSocket } from "../hooks/useWebSocket";

interface AuthContextType {
  isLoggedIn: boolean | null;
  userUuid: string | null;
  name: string | null;
  isRoot: boolean;
  login: (
    uuid: string,
    firstName: string,
    lastName: string,
    isRoot: boolean,
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  userUuid: null,
  name: null,
  isRoot: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isRoot, setIsRoot] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { status, data } = await checkAuthStatus();
        if (status === "success") {
          setUserUuid(data.userUuid);
          setName(`${data.firstName} ${data.lastName}`);
          setIsRoot(data.isRoot);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error("Error checking session:", e);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const login = (
    uuid: string,
    firstName: string,
    lastName: string,
    isRoot: boolean,
  ) => {
    setUserUuid(uuid);
    setName(`${firstName} ${lastName}`);
    setIsRoot(isRoot);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutService();
      setUserUuid(null);
      setName(null);
      setIsRoot(false);
      setIsLoggedIn(false);
      sessionStorage.removeItem("access_token");
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  useWebSocket(isLoggedIn)

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userUuid, name, isRoot, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
