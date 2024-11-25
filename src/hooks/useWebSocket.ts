import io from "socket.io-client";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { eventBus } from "./eventBus";

/**
 * Custom hook for managing a WebSocket connection.
 * Initializes the WebSocket connection when the user is logged in
 * and handles authentication, notifications, and disconnection events.
 *
 * @param isLoggedIn - Boolean or null indicating the user's logged-in state.
 */
export const useWebSocket = (isLoggedIn: boolean | null) => {
  const toast = useToast();

  useEffect(() => {
    // Ensure a valid access token exists before establishing the connection
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) return;

    // Construct WebSocket URL and options
    const socket = io(
      import.meta.env.VITE_BASEURL
        ? `${import.meta.env.VITE_BASEURL}/notifications`
        : "/notifications",
      {
        query: { token: accessToken },
        transports: ["websocket"],
      },
    );

    socket.on("authenticated", () => {
      sessionStorage.removeItem("access_token");
    });

    // Handle new notifications
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

      // Emit an event for the notification
      eventBus.emit("newIssueNotification", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, toast]);
};
