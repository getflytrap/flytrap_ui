import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL,
});

// Create a separate Axios client for refreshing the access token
const refreshClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL,
});

// Request interceptor to set headers for API requests
apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors and retry the request if unauthorized
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle token refresh if unauthorized (401 error)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshClient.post("/api/auth/refresh");
        const newAccessToken = data.payload;

        // Update the Authorization header for future requests
        apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Remove the Authorization header if refresh fails
        delete apiClient.defaults.headers.common["Authorization"];
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
