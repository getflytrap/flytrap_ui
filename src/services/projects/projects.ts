import { ZodError } from "zod";
import apiClient from "../apiClient";
import { logError } from "../../helpers";
import { getAllProjectsResponseSchema, createProjectResponseSchema } from "./projectSchemas";

export const getAllProjects = async (page: number = 1, limit?: number) => {
  try {
    const params = limit ? { page, limit } : { page };
    const { data } = await apiClient.get("/api/projects", { params });

    getAllProjectsResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const createProject = async (projectName: string, platform: string) => {
  if (!projectName || !platform) {
    throw new Error("Missing project name or platform.");
  }

  try {
    const { data } = await apiClient.post("/api/projects", {
      name: projectName,
      platform,
    });
    createProjectResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const deleteProject = async (projectUuid: string) => {
  if (!projectUuid) {
    throw new Error("Project identifier required.");
  }

  await apiClient.delete(`/api/projects/${projectUuid}`);
};

export const renameProject = async (
  projectUuid: string,
  newProjectName: string,
) => {
  if (!projectUuid || !newProjectName) {
    throw new Error("Project identifier and new project name required.");
  }

  await apiClient.patch(`/api/projects/${projectUuid}`, {
    new_name: newProjectName,
  });
};
