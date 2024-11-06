import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const access_token = JSON.parse(localStorage.getItem("userData"))?.token; // localStorage is used for now
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
