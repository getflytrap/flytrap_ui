import { createContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { logout as logoutService, getSessionInfo } from "../services";
import { useWebSocket } from "../hooks/useWebSocket";

/**
 * AuthContextType defines the shape of the authentication context,
 * providing state and actions for managing user authentication.
 */
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
  loading: boolean;
}

/**
 * Create the AuthContext with default values for all fields.
 */
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  userUuid: null,
  name: null,
  isRoot: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

/**
 * AuthProvider is a context provider that wraps the app or specific parts of the app,
 * providing authentication state and actions to child components.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isRoot, setIsRoot] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  /**
   * Runs on initial load to verify the session status.
   * Updates the authentication state accordingly.
   */
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getSessionInfo();
        if (data) {
          setUserUuid(data.user_uuid);
          setName(`${data.first_name} ${data.last_name}`);
          setIsRoot(data.is_root);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);

        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";

        toast({
          title: "Session Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  /**
   * Handles login by updating the authentication state
   * and displaying a success toast message.
   */
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

    toast({
      title: "Successful Login",
      description: `Welcome, ${firstName} ${lastName}!`,
      status: "success",
      duration: 3000,
      position: "bottom-right",
      variant: "left-accent",
      isClosable: true,
    });
  };

  /**
   * Handles logout by calling the logout service,
   * clearing local state, and displaying toast messages.
   */
  const logout = async () => {
    try {
      await logoutService();

      toast({
        title: "Successful Logout",
        description: "Goodbye!",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "An error occurred. You will be logged out.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      setUserUuid(null);
      setName(null);
      setIsRoot(false);
      setIsLoggedIn(false);
      sessionStorage.removeItem("access_token");
    }
  };

  /**
   * Initializes the WebSocket connection based on the logged-in state.
   */
  useWebSocket(isLoggedIn);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userUuid, name, isRoot, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
