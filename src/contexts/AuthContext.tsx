import { createContext, useState, ReactNode, useEffect } from "react";
import { logout as logoutService, checkAuthStatus } from "../services";

interface AuthContextType {
  isLoggedIn: boolean | null;
  userUuid: string | null;
  name: string | null;
  isRoot: boolean;
  login: (
    uuid: string,
    firstName: string,
    lastName: string,
    isRoot: boolean
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isRoot, setIsRoot] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await checkAuthStatus();
        if (data.status === "success") {
          setUserUuid(data.data.user_uuid);
          setName(`${data.data.first_name} ${data.data.last_name}`);
          setIsRoot(data.data.is_root);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error("Error checking session:", e);
        setIsLoggedIn(false);
      }
    };
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      checkSession();
    }
  }, []);

  const login = (
    uuid: string,
    firstName: string,
    lastName: string,
    isRoot: boolean
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
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userUuid, name, isRoot, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
