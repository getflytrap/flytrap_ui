import { z } from "zod";
import { projectSchema } from "../projects/projectSchemas";

const userSchema = z.object({
  uuid: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  is_root: z.boolean(),
});

export const sessionInfoResponseSchema = z.object({
  payload: userSchema,
});

export const getUsersResponseSchema = z.object({
  payload: z.array(userSchema),
});

export const createAccountResponseSchema = z.object({
  payload: userSchema,
});

export const getProjectsForUserResponseSchema = z.object({
  payload: z.object({
    projects: z.array(projectSchema),
    current_page: z.number(),
    total_pages: z.number(),
  }),
})