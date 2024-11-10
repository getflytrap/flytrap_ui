import axios from 'axios';

// axios.defaults.withCredentials = true;

const apiClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL,
});

// Separate client for refresh to avoid loop issues
const refreshClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASEURL,
});


// Request interceptor to set headers
apiClient.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and retries
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshClient.post('/api/auth/refresh');
        const newAccessToken = data.access_token;

        console.log('new access token: ', newAccessToken);
        // Update the Authorization header for future requests
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        delete apiClient.defaults.headers.common['Authorization'];
        // Redirect to login if the refresh fails or handle as necessary
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
