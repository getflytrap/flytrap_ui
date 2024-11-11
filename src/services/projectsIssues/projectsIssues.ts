import { 
  GetIssuesResponse,
} from './projectsIssuesTypes';
import { ErrorData, Rejection } from '../../types';
import apiClient from '../apiClient';

export const getIssues = async (
  projectUuid: string | undefined,
  selectedHandled: boolean | null,
  selectedTime: string | null,
  currentPage: number,
  limit: number,
): Promise<GetIssuesResponse> => {
  const params = {
    handled: selectedHandled,
    time: selectedTime,
    page: currentPage,
    limit: limit,
  };

  const { data } = await apiClient.get(`/api/projects/${projectUuid}/issues`, { params });

  return data;
};

export const deleteIssues = async (
  projectId: string
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues`);
};

export const getError = async (
  projectId: string | undefined, 
  errorId: string | undefined
): Promise<{status: string, data: ErrorData}> => {
  const { data } = await apiClient.get(`/api/projects/${projectId}/issues/errors/${errorId}`);
  return data;
};

export const getRejection = async (
  projectId: string,
  rejectionId: string
): Promise<{status: string, data: Rejection}> => {
  const { data } = await apiClient.get(`/api/projects/${projectId}/issues/rejections/${rejectionId}`);
  return data
}

export const toggleError = async (
  projectId: string | undefined,
  errorId: string | undefined,
  newResolvedState: boolean
): Promise<void> => {
  await apiClient.patch(`/api/projects/${projectId}/issues/errors/${errorId}`, {
    resolved: newResolvedState,
  });
};

export const toggleRejection = async (
  projectId: string | undefined,
  rejectionId: string | undefined,
  newResolvedState: boolean
): Promise<void> => {
  await apiClient.patch(`/api/projects/${projectId}/issues/rejections/${rejectionId}`, {
    resolved: newResolvedState,
  });
};

export const deleteError = async (
  projectId: string | undefined, 
  errorId: string | undefined
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues/errors/${errorId}`);
};

export const deleteRejection = async (
  projectId: string | undefined, 
  rejectionId: string | undefined
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues/rejections/${rejectionId}`);
};
