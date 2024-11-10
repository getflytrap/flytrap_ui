import { 
  CreateAccountRequest,
  CreateAccountResponse,
  User,
  UserProjectsResponse
} from './usersTypes';

import apiClient from '../apiClient';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get("/api/users");
  return data;
};

export const createAccount = async (
  account_data: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  const { data } = await apiClient.post("/api/users", account_data);
  return data;
};

export const deleteAccount = async (
  id: string
): Promise<void> => {
  await apiClient.delete(`/api/users/${id}`);
};

export const updatePassword = async (
  id: string, 
  password: string
): Promise<void> => {
  await apiClient.patch(`/api/users/${id}`, {
    password,
  });
};

export const getProjectsForUser = async (
  user_uuid: string,
  currentPage: number, 
  limit: number
): Promise<UserProjectsResponse> => {
  const params = {
    page: currentPage,
    limit: limit,
  };
  const { data } = await apiClient.get(`/api/users/${user_uuid}/projects`, { params });
  return data;
};