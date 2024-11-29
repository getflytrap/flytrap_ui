import { InternalAxiosRequestConfig } from "axios";
import { ZodError } from "zod";
import apiClient from "../apiClient";
import { logError } from "../../helpers";
import { loginResponseSchema } from "./authSchemas";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await apiClient.post("/api/auth/login", {
      email,
      password,
    }, { skipRefresh: true } as InternalAxiosRequestConfig);

    loginResponseSchema.parse(data);

    // Set access token in headers and session storage
    const accessToken = data.payload.access_token;
    apiClient.defaults.headers.common["Authorization"] =
      `Bearer ${accessToken}`;
    sessionStorage.setItem("access_token", accessToken);

    return data.payload.user;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/api/auth/logout");
  } finally {
    // Always clear local authentication data
    delete apiClient.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("access_token");
  }
};
