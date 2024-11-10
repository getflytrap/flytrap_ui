import { 
  GetErrorsRequest,
  GetIssuesResponse,
  Error, 
} from './projectsIssuesTypes'; // Import types here
import apiClient from '../apiClient';

export const getErrors = async (
  requestData: GetErrorsRequest
): Promise<GetIssuesResponse> => {
  try {
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
  } catch (e) {
    console.error("Error fetching errors:", e);
  }
};

// Define deleteErrors with a type for the return value
export const deleteErrors = async (
  projectId: string
): Promise<void> => {
  try {
    await apiClient.delete(`/api/projects/${projectId}/errors`);
  } catch (error) {
    console.error("Error deleting errors:", error);
  }
};

export const getError = async (
  projectId: string, 
  errorId: string
): Promise<Error> => {
  try {
    const { data } = await apiClient.get(`/api/projects/${projectId}/errors/${errorId}`);
    return data;
  } catch (error) {
    console.error("Error fetching error:", error);
  }
};

export const toggleError = async (
  projectId: string,
  errorId: string,
  newResolvedState: boolean
): Promise<void> => {
  try {
    await apiClient.patch(`/api/projects/${projectId}/errors/${errorId}`, {
      resolved: newResolvedState,
    });
  } catch (error) {
    console.error("Error updating error state:", error);
  }
};

export const deleteError = async (
  projectId: string, 
  errorId: string
): Promise<void> => {
  try {
    await apiClient.delete(`/api/projects/${projectId}/errors/${errorId}`);
  } catch (error) {
    console.error("Error deleting error:", error);
  }
};
