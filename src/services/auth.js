import apiClient from './apiClient';

export const login = async (email, password) => {
  const { data } = await apiClient.post('/api/auth/login', { email, password });
  const accessToken = data.access_token;

  // Set Authorization header for future requests
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return accessToken;
};

export const logout = async () => {
  await apiClient.post('/api/auth/logout');
  delete apiClient.defaults.headers.common['Authorization'];
};

export const checkAuthStatus = async () => {
  try {
    const { data } = await apiClient.get('/api/auth/status');
    return data;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}