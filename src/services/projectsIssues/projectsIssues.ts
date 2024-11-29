import { ZodError } from "zod";
import apiClient from "../apiClient";
import { logError } from "../../helpers";
import { getIssuesResponseSchema, getErrorResponseSchema, getRejectionResponseSchema, getSummaryResponseSchema } from "./projectsIssuesSchemas";

export const getIssues = async (
  projectUuid: string | undefined,
  selectedHandled: boolean | null,
  selectedResolved: boolean | null,
  selectedTime: string | null,
  currentPage: number,
  limit: number,
) => {
  if (!projectUuid) {
    throw new Error("Project identifier is required.");
  }

  const params = {
    handled: selectedHandled,
    resolved: selectedResolved,
    time: selectedTime,
    page: currentPage,
    limit: limit,
  };

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues`,
      {
        params,
      },
    );

    getIssuesResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const deleteIssues = async (projectUuid: string) => {
  if (!projectUuid) {
    throw new Error('Project identifier required.');
  }

  await apiClient.delete(`/api/projects/${projectUuid}/issues`);
};

export const getError = async (projectUuid: string, errorUuid: string) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project and error identifiers are required.");
  }

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
    );

    getErrorResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const getRejection = async (
  projectUuid: string,
  rejectionUuid: string,
) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project and rejection identifiers are required.");
  }

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
    );

    getRejectionResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};

export const toggleError = async (
  projectUuid: string,
  errorUuid: string,
  newResolvedState: boolean,
) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project and error identifiers are required.");
  }

  await apiClient.patch(
    `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
    {
      resolved: newResolvedState,
    },
  );
};

export const toggleRejection = async (
  projectUuid: string,
  rejectionUuid: string,
  newResolvedState: boolean,
) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project and rejection identifiers are required.");
  }

  await apiClient.patch(
    `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
    {
      resolved: newResolvedState,
    },
  );
};

export const deleteError = async (projectUuid: string, errorUuid: string) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project and error identifiers are required.");
  }

  await apiClient.delete(
    `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
  );
};

export const deleteRejection = async (
  projectUuid: string,
  rejectionUuid: string,
) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project and rejection identifiers are required.");
  }

  await apiClient.delete(
    `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
  );
};

export const getDailyCounts = async (projectUuid: string | undefined) => {
  if (!projectUuid) {
    throw new Error("Project identifier required.");
  }

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/summary`,
    );

    getSummaryResponseSchema.parse(data);
    return data.payload;
  } catch (error) {
    if (error instanceof ZodError) {
      logError(error);
      throw new Error("An unexpected error occurred.");
    }

    throw error;
  }
};
