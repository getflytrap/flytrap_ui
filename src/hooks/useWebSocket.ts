import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import io from "socket.io-client";

export const useWebSocket = (isLoggedIn: boolean | null) => {
  const toast = useToast();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) return;

    const socket = io(`${import.meta.env.VITE_BASEURL}/notifications`, {
      query: { token: accessToken },
      transports: ["websocket"],
    });

    // Remove log statements
    socket.on('connect', () => {
      console.log("WebSocket connected.")
    });
    
    socket.on("authenticated", () => {
      console.log("WebSocket connection authenticated.");
      sessionStorage.removeItem("access_token");  
    });

    socket.on("new_notification", (data) => {
      toast({
        title: "New Issue Logged",
        description: data.project_name,
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected.");
    });

    return () => {
      socket.disconnect();
    }
  }, [isLoggedIn, toast]);
};
