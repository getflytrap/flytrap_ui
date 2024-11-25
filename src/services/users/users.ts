import axios from "axios";
import { CreateAccountData } from "./usersTypes";
import apiClient from "../apiClient";

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get("/api/users");
    return data.payload; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching daily counts.");
  }
};

export const createAccount = async (
  accountData: CreateAccountData,
) => {
  if (!accountData) {
    throw new Error("Missing input data.");
  }

  try {
    const { data } = await apiClient.post("/api/users", accountData);
    
    const userData = {
      uuid: data.payload.uuid,
      firstName: data.payload.first_name,
      lastName: data.payload.last_name
    }

    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while creating account.");
  }
};

export const deleteAccount = async (id: string) => {
  try {
    await apiClient.delete(`/api/users/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }  else if (status === 404) {
          throw new Error("User not found.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while deleting account.");
  }
};

export const updatePassword = async (
  userUuid: string,
  password: string,
) => {
  if (!userUuid || !password) { 
    throw new Error("Both user uuid and password are required.");
  }

  try {
    await apiClient.patch(`/api/users/${userUuid}`, {
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }  else if (status === 404) {
          throw new Error("User not found.")
        } else if (status === 400) {
          throw new Error("Invalid request.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while updating password.");
  }
};

export const getProjectsForUser = async (
  userUuid: string | null,
  page: number,
  limit: number,
) => {
  const params = { page, limit };

  try {
    const { data } = await apiClient.get(`/api/users/${userUuid}/projects`, {
      params,
    });

    const projectData = {
      projects: data.payload.projects,
      currentPage: data.payload.current_page,
      totalPages: data.payload.total_pages
    }

    return projectData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        } 

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }
    throw new Error("An unexpected error occurred while fetching projects.");
  }
};
