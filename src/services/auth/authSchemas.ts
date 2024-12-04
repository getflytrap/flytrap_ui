import { z } from "zod";

// Login response schema
export const loginResponseSchema = z.object({
  payload: z.object({
    user: z.object({
      uuid: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      is_root: z.boolean(),
    }),
    access_token: z.string(),
  }),
});
