import { GetIssuesResponse } from "./projectsIssuesTypes";
import { ErrorData, Rejection } from "../../types";
import apiClient from "../apiClient";

export const getIssues = async (
  projectUuid: string | undefined,
  selectedHandled: boolean | null,
  selectedResolved: boolean | null,
  selectedTime: string | null,
  currentPage: number,
  limit: number,
): Promise<GetIssuesResponse> => {
  const params = {
    handled: selectedHandled,
    resolved: selectedResolved,
    time: selectedTime,
    page: currentPage,
    limit: limit,
  };

  const { data } = await apiClient.get(`/api/projects/${projectUuid}/issues`, {
    params,
  });

  return data;
};

export const deleteIssues = async (projectUuid: string): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectUuid}/issues`);
};

export const getError = async (
  projectUuid: string | undefined,
  errorUuid: string | undefined,
): Promise<{ status: string; data: ErrorData }> => {
  const { data } = await apiClient.get(
    `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
  );
  return data;
};

export const getRejection = async (
  projectUuid: string | undefined,
  rejectionUuid: string | undefined,
): Promise<{ status: string; data: Rejection }> => {
  const { data } = await apiClient.get(
    `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
  );
  return data;
};

export const toggleError = async (
  projectUuid: string | undefined,
  errorUuid: string | undefined,
  newResolvedState: boolean,
): Promise<void> => {
  await apiClient.patch(
    `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
    {
      resolved: newResolvedState,
    },
  );
};

export const toggleRejection = async (
  projectUuid: string | undefined,
  rejectionUuid: string | undefined,
  newResolvedState: boolean,
): Promise<void> => {
  await apiClient.patch(
    `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
    {
      resolved: newResolvedState,
    },
  );
};

export const deleteError = async (
  projectUuid: string | undefined,
  errorUuid: string | undefined,
): Promise<void> => {
  await apiClient.delete(
    `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
  );
};

export const deleteRejection = async (
  projectUuid: string | undefined,
  rejectionUuid: string | undefined,
): Promise<void> => {
  await apiClient.delete(
    `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
  );
};

export const getDailyCounts = async (
  projectUuid: string | undefined
): Promise<{ status: string, data: number[]}> => {
  const { data } = await apiClient.get(`/api/projects/${projectUuid}/issues/summary`);
  return data;
}