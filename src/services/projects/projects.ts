import axios from "axios";
import apiClient from "../apiClient";

export const getAllProjects = async (page: number = 1, limit?: number) => {
  try {
    const params = limit ? { page, limit } : { page };
    const { data } = await apiClient.get("/api/projects", { params });

    const projectData = {
      projects: data.payload.projects,
      currentPage: data.payload.current_page,
      totalPages: data.payload.total_pages,
    };

    return projectData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching projects.");
  }
};

export const createProject = async (projectName: string, platform: string) => {
  if (!projectName || !platform) {
    throw new Error("Both project name and platform required.");
  }

  try {
    const { data } = await apiClient.post("/api/projects", {
      name: projectName,
      platform,
    });

    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 400) {
          throw new Error("Invalid request.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching projects.");
  }
};

export const deleteProject = async (projectUuid: string) => {
  if (!projectUuid) {
    throw new Error("Project uuid required.");
  }

  try {
    await apiClient.delete(`/api/projects/${projectUuid}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 404) {
          throw new Error("Project not found.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching projects.");
  }
};

export const renameProject = async (
  projectUuid: string,
  newProjectName: string,
) => {
  if (!projectUuid || !newProjectName) {
    throw new Error("Project uuid and new project name required.");
  }

  try {
    await apiClient.patch(`/api/projects/${projectUuid}`, {
      new_name: newProjectName,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 400) {
          throw new Error("Invalid request.");
        } else if (status === 404) {
          throw new Error("Project not found.");
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching projects.");
  }
};
