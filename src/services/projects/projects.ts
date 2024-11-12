import { getAllProjectsResponse, createProjectResponse } from "./projectsTypes";

import apiClient from "../apiClient";

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

  return data;
};

export const deleteProject = async (
  projectUuid: string | undefined
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectUuid}`);
};

export const renameProject = async (
  projectUuid: string | undefined,
  newProjectName: string
): Promise<void> => {
  await apiClient.patch(`/api/projects/${projectUuid}`, {
    new_name: newProjectName,
  });
};
