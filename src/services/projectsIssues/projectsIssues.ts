import { 
  GetIssuesRequest,
  GetIssuesResponse,
  Error,
  Rejection
} from './projectsIssuesTypes'; // Import types here
import apiClient from '../apiClient';

export const getIssues = async (
  requestData: GetIssuesRequest
): Promise<GetIssuesResponse> => {
  const params = {
    handled: requestData.selectedHandled,
    time: requestData.selectedTime,
    page: requestData.currentPage,
    limit: requestData.limit,
  };

  const { data } = await apiClient.get(`/api/projects/${requestData.projectId}/issues`, { params });

  return {
    errors: data.data.issues, // `issues` includes both errors and rejections
    totalPages: data.data.total_pages,
    currentPage: data.data.current_page,
  };
};

export const deleteIssues = async (
  projectId: string
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues`);
};

export const getError = async (
  projectId: string, 
  errorId: string
): Promise<Error> => {
  const { data } = await apiClient.get(`/api/projects/${projectId}/issues/errors/${errorId}`);
  return data;
};

export const getRejection = async (
  projectId: string,
  rejectionId: string
): Promise<Rejection> => {
  const { data } = await apiClient.get(`/api/projects/${projectId}/issues/rejections/${rejectionId}`);
  return data
}

export const toggleError = async (
  projectId: string,
  errorId: string,
  newResolvedState: boolean
): Promise<void> => {
  await apiClient.patch(`/api/projects/${projectId}/issues/errors/${errorId}`, {
    resolved: newResolvedState,
  });
};

export const toggleRejection = async (
  projectId: string,
  rejectionId: string,
  newResolvedState: boolean
): Promise<void> => {
  await apiClient.patch(`/api/projects/${projectId}/issues/rejections/${rejectionId}`, {
    resolved: newResolvedState,
  });
};

export const deleteError = async (
  projectId: string, 
  errorId: string
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues/errors/${errorId}`);
};

export const deleteRejection = async (
  projectId: string, 
  rejectionId: string
): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/issues/rejections/${rejectionId}`);
};
