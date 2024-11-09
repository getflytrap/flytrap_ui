import apiClient from './apiClient';

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

// Issues Per Project
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

// Project Users
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
