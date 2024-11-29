import { z } from "zod";

export const getUsersForProjectResponseSchema = z.object({
  payload: z.array(z.string()),
});