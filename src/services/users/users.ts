import {
  CreateAccountResponse,
  UserProjectsResponse,
} from "./usersTypes";
import { User } from "../../types";
import apiClient from "../apiClient";

export const getUsers = async (): Promise<{status: string, data: User[]}> => {
  const { data } = await apiClient.get("/api/users");
  return data;
};

export const createAccount = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmedPassword: string,
): Promise<CreateAccountResponse> => {
  const accountData = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirmed_password: confirmedPassword
  }

  const { data } = await apiClient.post("/api/users", accountData);
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
): Promise<{ status: string; data: UserProjectsResponse }> => {
  const params = {
    page,
    limit,
  };
  const { data } = await apiClient.get(`/api/users/${userUuid}/projects`, {
    params,
  });
  return data;
};
