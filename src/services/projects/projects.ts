  import { 
    getAllProjectsResponse,
    createProjectResponse,
  } from './projectsTypes';
  
  import apiClient from '../apiClient';

  export const getAllProjects = async (): Promise<getAllProjectsResponse> => {
    try {
      const { data } = await apiClient.get("/api/projects");
      return data;
    } catch (e) {
      console.error("Error fetching projects:", e);
    }
  };

  export const createProject = async (
    projectName: string
  ): Promise<createProjectResponse> => {
    try {
      const response = await apiClient.post("/api/projects", {
        name: projectName,
      });
      if (response.status !== 204) {
        throw new Error("Error creating project:")
      }
    } catch (e) {
      console.error("Error creating project:", e);
    }
  };

  export const deleteProject = async (
    projectId: string
  ): Promise<void> => {
    try {
      await apiClient.delete(`/api/projects/${projectId}`);
    } catch (e) {
      console.error("Error deleting project:", e);
    }
  };

  export const renameProject = async (
    projectId: string, 
    newProjectName: string
  ): Promise<void> => {
    try {
      await apiClient.patch(`/api/projects/${projectId}`, {
        new_name: newProjectName,
      });
    } catch (e) {
      console.error("Error updating project name:", e);
    }
  };