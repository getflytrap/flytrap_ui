import { ZodError } from "zod";
import apiClient from "../apiClient";
import { logError } from "../../helpers";
import { AccountDataType } from "../../types";
import { sessionInfoResponseSchema, createAccountResponseSchema, getProjectsForUserResponseSchema } from "./userSchemas";

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get("/api/users");
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const createAccount = async (accountData: AccountDataType) => {
  if (!accountData) {
    throw new Error("Missing input data.");
  }

  try {
    const { data } = await apiClient.post("/api/users", accountData);

    createAccountResponseSchema.parse(data);

    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const deleteAccount = async (userUuid: string) => {
  if (!userUuid) {
    throw new Error("User identifier required.");
  }

  await apiClient.delete(`/api/users/${userUuid}`);
};

export const updatePassword = async (userUuid: string, password: string) => {
  if (!userUuid || !password) {
    throw new Error("Both user identifier and new password are required.");
  }

  await apiClient.patch(`/api/users/${userUuid}`, {
    password,
  });
};

export const getProjectsForUser = async (
  userUuid: string | null,
  page: number,
  limit: number,
) => {
  if (!userUuid) {
    throw new Error("User identifier required.");
  }

  // TODO: Parameter validation
  const params = { page, limit };

  try {
    const { data } = await apiClient.get(`/api/users/${userUuid}/projects`, {
      params,
    });

    getProjectsForUserResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const getSessionInfo = async () => {
  try {
    const { data } = await apiClient.get("/api/users/me");
    sessionInfoResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};