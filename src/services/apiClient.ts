import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL, // Assuming you're using Vite for environment variables
});

// Create a separate Axios client for refreshing the access token
const refreshClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL,
});

// Request interceptor to set headers for API requests
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/json'; // Ensure the Content-Type is always application/json
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and retry the request if unauthorized
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // Simply return the response if successful
  async (error: AxiosError) => {
    const originalRequest = error.config; // Keep track of the original request

    // Handle token refresh if unauthorized (401 error)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops

      try {
        const { data } = await refreshClient.post('/api/auth/refresh');
        const newAccessToken = data.access_token;

        console.log('New access token: ', newAccessToken);
        // Update the Authorization header for future requests
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Remove the Authorization header if refresh fails
        delete apiClient.defaults.headers.common['Authorization'];
        // redirect the user to the login page or handle this as needed
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
