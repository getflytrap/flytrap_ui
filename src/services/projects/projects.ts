  import { 
    getAllProjectsResponse,
    createProjectResponse,
  } from './projectsTypes';
  
  import apiClient from '../apiClient';

  export const getAllProjects = async (): Promise<getAllProjectsResponse> => {
    const { data } = await apiClient.get("/api/projects");

    return data;
  };

  export const createProject = async (
    projectName: string
  ): Promise<createProjectResponse> => {
    const { data } = await apiClient.post("/api/projects", {
      name: projectName,
    });

    return data
  };

  export const deleteProject = async (
    projectId: string
  ): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}`);
  };

  export const renameProject = async (
    projectId: string, 
    newProjectName: string
  ): Promise<void> => {
    await apiClient.patch(`/api/projects/${projectId}`, {
      new_name: newProjectName,
    });
  };