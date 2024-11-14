import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import io from "socket.io-client";

export const useWebSocket = (isLoggedIn: boolean | null) => {
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) return; 

    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) return;

    const socket = io(`${import.meta.env.VITE_BASE_URL}/api/notifications/events`, {
      query: { token: accessToken }
    });

    socket.on("authenticated", () => {
      console.log("WebSocket connection authenticated.");
      sessionStorage.removeItem("access_token");  
    });

    socket.on("new_notification", (data) => {
      toast({
        title: "New Issue Logged",
        description: data.message,
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
  }, [toast]);
};
