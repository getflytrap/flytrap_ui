import { 
  CreateAccountRequest,
  CreateAccountResponse,
  User,
  UserProjectsResponse
} from './usersTypes';

import apiClient from '../apiClient';

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await apiClient.get("/api/users");
    return data;
  } catch (e) {
    console.error("Error fetching users:", e);
  }
};

export const createAccount = async (
  account_data: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  try {
    const { data } = await apiClient.post("/api/users", account_data);
    return data;
  } catch (e) {
    console.error("Error creating account:", e);
  }
};

export const deleteAccount = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/users/${id}`);
    return { success: true, message: "User deleted successfully." };
  } catch (e) {
    console.error("Error deleting account:", e);
  }
};

export const updatePassword = async (id: string, password: string): Promise<void> => {
  try {
    await apiClient.patch(`/api/users/${id}`, {
      password,
    });
  } catch (e) {
    console.error("Error updating password:", e);
  }
};

export const getProjectsForUser = async (
  user_uuid: string,
  currentPage: number, 
  limit: number
): Promise<UserProjectsResponse> => {
  try {
    const params = {
      page: currentPage,
      limit: limit,
    };
    const { data } = await apiClient.get(`/api/users/${user_uuid}/projects`, { params });
    return data;
  } catch (e) {
    console.error("Error fetching projects for user:", e);
  }
};