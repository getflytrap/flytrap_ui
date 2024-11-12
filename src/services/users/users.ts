import {
  CreateAccountRequest,
  UserProjectsResponse,
} from "./usersTypes";
import { User } from "../../types";
import apiClient from "../apiClient";

export const getUsers = async (): Promise<{status: string, data: User[]}> => {
  const { data } = await apiClient.get("/api/users");
  return data;
};

export const createAccount = async (
  account_data: CreateAccountRequest,
): Promise<User> => {
  const { data } = await apiClient.post("/api/users", account_data); 
  
  return data;
};

export const deleteAccount = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/users/${id}`);
};

export const updatePassword = async (
  userUuid: string,
  password: string,
): Promise<void> => {
  await apiClient.patch(`/api/users/${userUuid}`, {
    password,
  });
};

export const getProjectsForUser = async (
  userUuid: string | null,
  page: number,
  limit: number,
): Promise<UserProjectsResponse> => {
  const params = {
    page,
    limit,
  };
  const { data } = await apiClient.get(`/api/users/${userUuid}/projects`, {
    params,
  });
  return data;
};
