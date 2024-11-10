export interface loginResponse {
  access_token: string;
  status: string;
}

export interface logoutResponse {
  status: string;
  message: string;
}

export interface checkStatusResponse {
  status: string;
  user_uuid: string;
}