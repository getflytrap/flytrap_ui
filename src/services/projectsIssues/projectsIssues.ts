import axios from "axios";
import apiClient from "../apiClient";

export const getIssues = async (
  projectUuid: string | undefined,
  selectedHandled: boolean | null,
  selectedResolved: boolean | null,
  selectedTime: string | null,
  currentPage: number,
  limit: number,
) => {
  if (!projectUuid) {
    throw new Error("Project UUID is required to fetch issues.");
  }

  const params = {
    handled: selectedHandled,
    resolved: selectedResolved,
    time: selectedTime,
    page: currentPage,
    limit: limit,
  };

  try {
    const { data } = await apiClient.get(`/api/projects/${projectUuid}/issues`, {
      params,
    });
  
    const issuesData = {
      issues: data.payload.issues,
      currentPage: data.payload.current_page,
      totalPages: data.payload.total_pages
    }

    return issuesData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const deleteIssues = async (projectUuid: string) => {
  try {
    await apiClient.delete(`/api/projects/${projectUuid}/issues`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const getError = async (
  projectUuid: string,
  errorUuid: string,
) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
    );

    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching error data.");
  }
};

export const getRejection = async (
  projectUuid: string,
  rejectionUuid: string,
) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }
  
  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
    );
    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching rejection data.");
  }
};

export const toggleError = async (
  projectUuid: string,
  errorUuid: string,
  newResolvedState: boolean,
) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }

  try {
    await apiClient.patch(
      `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
      {
        resolved: newResolvedState,
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.");
        } else if (status === 400) {
          throw new Error("Invalid request.");
        } else if (status === 404) {
          throw new Error("Error not found.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const toggleRejection = async (
  projectUuid: string,
  rejectionUuid: string,
  newResolvedState: boolean,
) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }

  try { 
    await apiClient.patch(
      `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
      {
        resolved: newResolvedState,
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        } else if (status === 400) {
          throw new Error("Invalid request.");
        } else if (status === 404) {
          throw new Error("Rejection not found.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const deleteError = async (
  projectUuid: string,
  errorUuid: string,
) => {
  if (!projectUuid || !errorUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }
  
  try {
    await apiClient.delete(
      `/api/projects/${projectUuid}/issues/errors/${errorUuid}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        } else if (status === 404) {
          throw new Error("Error not found.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const deleteRejection = async (
  projectUuid: string,
  rejectionUuid: string,
 ) => {
  if (!projectUuid || !rejectionUuid) {
    throw new Error("Both project uuid and error uuid are required.");
  }

  try {
    await apiClient.delete(
      `/api/projects/${projectUuid}/issues/rejections/${rejectionUuid}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          throw new Error("Access forbidden.")
        } else if (status === 404) {
          throw new Error("Rejection not found.")
        }

        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error. Unable to fetch issues.");
      }
    }

    throw new Error("An unexpected error occurred while fetching issues.");
  }
};

export const getDailyCounts = async (
  projectUuid: string | undefined,
) => {
  if (!projectUuid) {
    throw new Error("Project UUID is required to fetch daily counts.");
  }

  try {
    const { data } = await apiClient.get(
      `/api/projects/${projectUuid}/issues/summary`,
    );

    return data.payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error("Internal server error.");
      } else if (error.request) {
        throw new Error("Network error.");
      }
    }

    throw new Error("An unexpected error occurred while fetching daily counts.");
  }
};
