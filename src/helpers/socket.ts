import { io, Socket } from "socket.io-client";
import { eventBus } from "./eventBus";

let socket: Socket | null = null;

export const connectSocket = (accessToken: string, toast: any) => {
  if (!socket) {
    socket = io(
      import.meta.env.VITE_BASEURL
      ? `${import.meta.env.VITE_BASEURL}/notifications`
      : "/notifications", 
      {
        autoConnect: false,
        transports: ["websocket"],
        auth: {
          token: accessToken,
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    if (import.meta.env.MODE === "development") {
      socket.on("connect", () =>
        console.log("WebSocket connected successfully."),
      );
      socket.on("connect_error", (error) =>
        console.error("WebSocket connection error:", error),
      );
      socket.on("disconnect", (reason) =>
        console.warn("WebSocket disconnected:", reason),
      );
    }

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
  }

  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
