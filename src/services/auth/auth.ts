import { loginResponse, logoutResponse, checkStatusResponse } from './authTypes';

import apiClient from '../apiClient';

// To-do: Decide whether to return empty string in catch block, or throw an error and let it propagate to the caller

export const login = async (
  email: string, 
  password: string
): Promise<string> => {
  const { data } = await apiClient.post<loginResponse>('/api/auth/login', { email, password });
  const accessToken = data.access_token;

  console.log('from login - access token: ', accessToken)

  // Set Authorization header for future requests
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return accessToken;
};

export const logout = async (): Promise<void> => {
  await apiClient.post<logoutResponse>('/api/auth/logout');
  delete apiClient.defaults.headers.common['Authorization']; 
};

export const checkAuthStatus = async (): Promise<boolean> => {
  const { data } = await apiClient.get<checkStatusResponse>('/api/auth/status');
  if (data && data.status === 'success') {
    return true;
  }
  console.log('Not authenticated.')
  return false;
}