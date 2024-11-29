import { ZodError } from "zod";
import apiClient from "../apiClient";
import { logError } from "../../helpers";
import { getUsersForProjectResponseSchema } from "./projectsUsersSchemas";

export const getUsersForProject = async (projectUuid: string) => {
  try {
    const { data } = await apiClient.get(`/api/projects/${projectUuid}/users`);

    getUsersForProjectResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const addUserToProject = async (
  projectUuid: string,
  userUuid: string,
) => {
  if (!projectUuid || !userUuid) {
    throw new Error("Both project and user identifiers are required.");
  }

  await apiClient.post(`/api/projects/${projectUuid}/users`, {
    user_uuid: userUuid,
  });
};

export const removeUserFromProject = async (
  projectUuid: string,
  userUuid: string,
) => {
  if (!projectUuid || !userUuid) {
    throw new Error("Both project and user identifiers are required.");
  }

  await apiClient.delete(`/api/projects/${projectUuid}/users/${userUuid}`);
};

