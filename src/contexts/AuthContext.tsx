import { createContext, useState, ReactNode, useEffect } from "react";
import { logout as logoutService, checkAuthStatus } from "../services";

type AuthContextType = {
  isLoggedIn: boolean | null;
  userUuid: string | null;
  login: (uuid: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  userUuid: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await checkAuthStatus();
        if (data.status === "success") {
          setIsLoggedIn(true);
          setUserUuid(data.user_uuid);
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

  const login = (uuid: string) => {
    setUserUuid(uuid);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutService();
      setIsLoggedIn(false);
      setUserUuid(null);
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userUuid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
