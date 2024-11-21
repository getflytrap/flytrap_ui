import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import io from "socket.io-client";
import { eventBus } from "./eventBus";

export const useWebSocket = (isLoggedIn: boolean | null) => {
  const toast = useToast();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) return;

    const socket = io(
      import.meta.env.VITE_BASEURL
        ? `${import.meta.env.VITE_BASEURL}/api/notifications`
        : '/api/notifications',
      {
      query: { token: accessToken },
      transports: ["websocket"],
      }
    );

    socket.on("authenticated", () => {
      sessionStorage.removeItem("access_token");
    });

    socket.on("new_notification", (data) => {
      toast({
        title: "New Issue Logged",
        description: data.project_name,
        status: "info",
        duration: 5000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });

      eventBus.emit("newIssueNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected.");
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, toast]);
};
