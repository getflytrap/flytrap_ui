import {
  loginResponse,
  loginServiceResponse,
  logoutResponse,
  checkStatusResponse,
} from "./authTypes";
import apiClient from "../apiClient";

export const login = async (
  email: string,
  password: string,
): Promise<loginServiceResponse> => {
  const { data } = await apiClient.post<loginResponse>("/api/auth/login", {
    email,
    password,
  });

  const accessToken = data.data.access_token;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  sessionStorage.setItem("access_token", accessToken);

  const userData = {
    userUuid: data.data.user_uuid,
    firstName: data.data.first_name,
    lastName: data.data.last_name,
    isRoot: data.data.is_root,
  };

  return userData;
};

export const logout = async (): Promise<void> => {
  await apiClient.post<logoutResponse>("/api/auth/logout");
  delete apiClient.defaults.headers.common["Authorization"];
};

export const checkAuthStatus = async (): Promise<checkStatusResponse> => {
  const { data } = await apiClient.get("/api/auth/status");
  const accessToken = data.data.access_token;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  sessionStorage.setItem("access_token", accessToken);

  const userData = {
    userUuid: data.data.user_uuid,
    firstName: data.data.first_name,
    lastName: data.data.last_name,
    isRoot: data.data.is_root,
  };

  return { status: data.status, data: userData };
};
