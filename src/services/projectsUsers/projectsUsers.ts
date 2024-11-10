import { User } from '../users/usersTypes'

import apiClient from '../apiClient';

export const addUserToProject = async (
  projectId: string,
  userId: string
): Promise<void> => {
  try {
    const { data } = await apiClient.post(`/api/projects/${projectId}/users`, {
      user_uuid: userId,
    });
    return data;
  } catch (e) {
    console.error("Error adding user to project:", e);
  }
};

export const removeUserFromProject = async (
  projectId: string,
  userId: string
): Promise<void> => {
  try {
    const { data } = await apiClient.delete(
      `/api/projects/${projectId}/users/${userId}`
    );
    return data;
  } catch (e) {
    console.error("Error removing user from project:", e);
  }
};

export const getUsersForProject = async (
  projectId: string
): Promise<User[]> => {
  try {
    const { data } = await apiClient.get(`/api/projects/${projectId}/users`);
    return data;
  } catch (e) {
    console.error("Error fetching users for project:", e);
  }
};
