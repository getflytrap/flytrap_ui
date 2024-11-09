import apiClient from './apiClient';

export const login = async (email, password) => {
  const { data } = await apiClient.post('/api/auth/login', { email, password });
  const accessToken = data.access_token;

  console.log('from login - access token: ', accessToken)

  // Set Authorization header for future requests
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return accessToken;
};

export const logout = async () => {
  await apiClient.post('/api/auth/logout');
  delete apiClient.defaults.headers.common['Authorization'];
};

export const checkAuthStatus = async () => {
  const { data } = apiClient.get('/api/auth/status');
  if (data.status === 'success') {
    return true;
  } else {
    console.log('Not authenticated.')
    return false;
  }
}