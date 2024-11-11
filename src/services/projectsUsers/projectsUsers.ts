import apiClient from "../apiClient";
import { ProjectsUsersResponse } from "./projectsUsersTypes";

export const addUserToProject = async (
  projectUuid: string,
  userUuid: string,
): Promise<void> => {
  await apiClient.post(`/api/projects/${projectUuid}/users`, {
    user_uuid: userUuid,
  });
};

export const removeUserFromProject = async (
  projectUuid: string,
  userUuid: string,
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectUuid}/users/${userUuid}`);
};

export const getUsersForProject = async (
  projectUuid: string,
): Promise<ProjectsUsersResponse> => {
  const { data } = await apiClient.get(`/api/projects/${projectUuid}/users`);
  return data;
};
