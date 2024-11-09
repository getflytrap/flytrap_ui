import apiClient from './apiClient';

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get("/api/users");
    return data;
  } catch (e) {
    console.error("Error fetching users:", e);
  }
};

export const createAccount = async (
  first_name,
  last_name,
  email,
  password,
  confirmed_password
) => {
  try {
    const { data } = await apiClient.post("/api/users", {
      first_name,
      last_name,
      email,
      password,
      confirmed_password,
    });
    return data;
  } catch (e) {
    console.error("Error creating account:", e);
  }
};

export const deleteAccount = async (id) => {
  try {
    await apiClient.delete(`/api/users/${id}`);
    return { success: true, message: "User deleted successfully." };
  } catch (e) {
    console.error("Error deleting account:", e);
  }
};

export const updatePassword = async (id, password) => {
  try {
    const { data } = await apiClient.patch(`/api/users/${id}`, {
      password,
    });
    return data;
  } catch (e) {
    console.error("Error updating password:", e);
  }
};

export const getProjectsForUser = async (user_uuid, currentPage, limit) => {
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