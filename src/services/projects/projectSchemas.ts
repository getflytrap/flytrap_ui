import { z } from "zod";

export const projectSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  api_key: z.string(),
  platform: z.string(),
});

const projectWithIssuesSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  api_key: z.string(),
  platform: z.string(),
  issue_count: z.number(),
});

export const getAllProjectsResponseSchema = z.object({
  payload: z.object({
    projects: z.array(projectWithIssuesSchema),
    total_pages: z.number(),
    current_page: z.number(),
  })
});

export const createProjectResponseSchema = z.object({
  payload: projectSchema,
})