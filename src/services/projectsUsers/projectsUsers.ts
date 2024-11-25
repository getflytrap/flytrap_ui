import axios from "axios";
import apiClient from "../apiClient";

export const addUserToProject = async (
  projectUuid: string,
  userUuid: string,
) => {
  if (!projectUuid || !userUuid) {
    throw new Error("Both project UUID and user UUID are required.");
  }

  try {
    await apiClient.post(`/api/projects/${projectUuid}/users`, {
      user_uuid: userUuid,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 400) {
          const message = error.response?.data?.message;

          if (message === "Root users cannot be added to projects") {
            throw new Error(message);
          }

          throw new Error("Project or user not found.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching users.");
  }
};

export const removeUserFromProject = async (
  projectUuid: string,
  userUuid: string,
) => {
  if (!projectUuid || !userUuid) {
    throw new Error("Both project UUID and user UUID are required.");
  }

  try {
    await apiClient.delete(`/api/projects/${projectUuid}/users/${userUuid}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 400) {
          throw new Error("Project or user not found.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching users.");
  }
};

export const getUsersForProject = async (projectUuid: string) => {
  try {
    const { data } = await apiClient.get(`/api/projects/${projectUuid}/users`);
    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching users.");
  }
};
