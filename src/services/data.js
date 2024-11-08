import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const access_token = JSON.parse(
      localStorage.getItem("userData")
    )?.access_token; // localStorage is used for now
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["new-access-token"];
    if (newAccessToken) {
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.access_token = newAccessToken;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    return Promise.reject(error);
  }
);

// * --- API calls --- * //
// Projects
export const getAllProjects = async () => {
  try {
    const { data } = await apiClient.get("/api/projects");
    return data;
  } catch (e) {
    console.error("Error fetching projects:", e);
  }
};

export const createProject = async (projectName) => {
  try {
    const { data } = await apiClient.post("/api/projects", {
      name: projectName,
    });
    return data;
  } catch (e) {
    console.error("Error creating project:", e);
  }
};

export const deleteProject = async (projectId) => {
  try {
    await apiClient.delete(`/api/projects/${projectId}`);
    return { success: true, message: "Project deleted successfully." };
  } catch (e) {
    console.error("Error deleting project:", e);
  }
};

export const renameProject = async (projectId, newProjectName) => {
  try {
    const { data } = await apiClient.patch(`/api/projects/${projectId}`, {
      new_name: newProjectName,
    });
    return data;
  } catch (e) {
    console.error("Error updating project name:", e);
  }
};

// Errors and Rejections Per Project
export const getErrors = async (
  projectId,
  selectedHandled,
  selectedTime,
  currentPage,
  limit
) => {
  try {
    const params = {
      handled: selectedHandled,
      time: selectedTime,
      page: currentPage,
      limit: limit,
    };

    const { data } = await apiClient.get(`/api/projects/${projectId}/issues`, {
      params,
    });

    return {
      errors: data.data.issues,
      totalPages: data.data.total_pages,
      currentPage: data.data.current_page,
    };
  } catch (e) {
    console.error("Error fetching errors:", e);
  }
};

export const deleteErrors = async (projectId) => {
  try {
    await apiClient.delete(`/api/projects/${projectId}/errors`);
    return { success: true, message: "All errors deleted successfully." };
  } catch (error) {
    console.error("Error deleting errors:", error);
  }
};

export const getError = async (projectId, errorId) => {
  console.log("ids in getError", projectId, errorId);
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectId}/errors/${errorId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching error:", error);
  }
};

export const toggleError = async (projectId, errorId, newResolvedState) => {
  try {
    const { data } = await apiClient.patch(
      `/api/projects/${projectId}/errors/${errorId}`,
      {
        resolved: newResolvedState,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating error state:", error);
  }
};

export const deleteError = async (projectId, errorId) => {
  try {
    await apiClient.delete(`/api/projects/${projectId}/errors/${errorId}`);
    return { success: true, message: "Error deleted successfully." };
  } catch (error) {
    console.error("Error deleting error:", error);
  }
};

// Users
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

export const postLoginData = async (email, password) => {
  try {
    const { data } = await apiClient.post("/api/auth/login", {
      email,
      password,
    });
    return data;
  } catch (e) {
    console.error("Error logging in:", e);
  }
};

export const addUserToProject = async (projectId, userId) => {
  try {
    const { data } = await apiClient.post(`/api/projects/${projectId}/users`, {
      user_uuid: userId,
    });
    return data;
  } catch (e) {
    console.error("Error adding user to project:", e);
  }
};

export const removeUserFromProject = async (projectId, userId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/projects/${projectId}/users/${userId}`
      // {
      //   data: {
      //     project_id: projectId,
      //     user_id: userId,
      //   },
      // }
    );
    return data;
  } catch (e) {
    console.error("Error removing user from project:", e);
  }
};

export const getUsersForProject = async (projectId) => {
  try {
    const { data } = await apiClient.get(`/api/projects/${projectId}/users`);
    return data;
  } catch (e) {
    console.error("Error fetching users for project:", e);
  }
};

export const getProjectsForUser = async (user_uuid) => {
  try {
    const { data } = await apiClient.get(`/api/${user_uuid}/projects`);
    return data;
  } catch (e) {
    console.error("Error fetching projects for user:", e);
  }
};
