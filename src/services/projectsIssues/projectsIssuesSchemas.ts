import { z } from "zod";

const errorSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  message: z.string(),
  created_at: z.string(),
  file: z.string().nullable(),
  line_number: z.number().nullable(),
  col_number: z.number().nullable(),
  project_uuid: z.string(),
  handled: z.boolean(),
  resolved: z.boolean(),
  total_occurrences: z.number(),
  distinct_users: z.number(),
});

const errorDetailSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  message: z.string(),
  created_at: z.string(),
  file: z.string().nullable(),
  line_number: z.number().nullable(),
  col_number: z.number().nullable(),
  project_uuid: z.string(),
  stack_trace: z.string(),
  handled: z.boolean(),
  resolved: z.boolean(),
  contexts: z.any(),
  method: z.string().nullable(),
  path: z.string().nullable(),
  os: z.string().nullable(),
  browser: z.string().nullable(),
  runtime: z.string().nullable(),
  total_occurrences: z.number(),
  distinct_users: z.number(),
});

const rejectionSchema = z.object({
  uuid: z.string(),
  value: z.string(),
  created_at: z.string(),
  project_uuid: z.string(),
  handled: z.boolean(),
  resolved: z.boolean(),
});

const rejectionDetailSchema = z.object({
  uuid: z.string(),
  value: z.string(),
  created_at: z.string(),
  project_uuid: z.string(),
  handled: z.boolean(),
  resolved: z.boolean(),
  method: z.string().nullable(),
  path: z.string().nullable(),
  os: z.string().nullable(),
  browser: z.string().nullable(),
  runtime: z.string().nullable(),
});

// Union of error and rejection issues
const issueSchema = z.union([errorSchema, rejectionSchema]);

export const getIssuesResponseSchema = z.object({
  payload: z.object({
    issues: z.array(issueSchema),
    current_page: z.number(),
    total_pages: z.number(),
  }),
});

export const getErrorResponseSchema = z.object({
  payload: errorDetailSchema,
})

export const getRejectionResponseSchema = z.object({
  payload: rejectionDetailSchema,
})

export const getSummaryResponseSchema = z.object({
  payload: z.array(z.number()),
})