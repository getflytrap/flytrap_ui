import { User } from '../users/usersTypes'

import apiClient from '../apiClient';

export const addUserToProject = async (
  projectId: string,
  userId: string
): Promise<void> => {
  await apiClient.post(`/api/projects/${projectId}/users`, {
    user_uuid: userId,
  });
};

export const removeUserFromProject = async (
  projectId: string,
  userId: string
): Promise<void> => {
  await apiClient.delete(
    `/api/projects/${projectId}/users/${userId}`
  );
};

export const getUsersForProject = async (
  projectId: string
): Promise<User[]> => {
  const { data } = await apiClient.get(`/api/projects/${projectId}/users`);
  return data;
};
