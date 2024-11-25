import axios from "axios";
import apiClient from "../apiClient";

export const login = async (
  email: string,
  password: string,
) => {
  try {
    const { data } = await apiClient.post("/api/auth/login", {
      email,
      password,
    });

    // Set access token in headers and session storage
    const accessToken = data.payload.access_token;
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    sessionStorage.setItem("access_token", accessToken);
  
    // Extract user data
    const userData = {
      userUuid: data.payload.user_uuid,
      firstName: data.payload.first_name,
      lastName: data.payload.last_name,
      isRoot: data.payload.is_root,
    };
  
    return userData;
  } catch (error) {
    // Handle specific error scenarios
    if (axios.isAxiosError(error)) {
      // Handle known API errors
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          throw new Error("Missing email or password");
        } else if (status === 403) {
          throw new Error("Wrong email or password.");
        } else if (status === 500) {
          throw new Error("Internal server error. Please try again later.");
        }
      } else if (error.request) {
        // No response received from server
        throw new Error("Network error.");
      } else {
        // Unexpected error
        throw new Error("An unexpected error occurred.");
      }
    }

    // Handle non-Axios errors
    throw new Error("An unknown error occurred. Please try again.");
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/api/auth/logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error("Internal server error.")
      } else if (error.request) {
        throw new Error("Network error.")
      }
    }

    // Handle non-Axios errors
    throw new Error("An unknown error occurred.");
  } finally {
    // Always clear local authentication data
    delete apiClient.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("access_token");
  }
};

export const checkAuthStatus = async () => {
  try {
    const { data } = await apiClient.get("/api/auth/status");

    const userData = {
      userUuid: data.payload.user_uuid,
      firstName: data.payload.first_name,
      lastName: data.payload.last_name,
      isRoot: data.payload.is_root,
    };
    
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle known API errors
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 400) {
          // Explicitly indicate no active session
          return null;
        } else if (status === 404) {
          throw new Error("User not found. Please log in again.")
        } else {
          throw new Error("Internal server error.");
        }
      } else if (error.request) {
        // No response received from server
        throw new Error("Network error.");
      }
    }
    // Handle non-Axios errors
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
