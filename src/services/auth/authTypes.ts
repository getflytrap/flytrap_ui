export interface loginResponse {
  access_token: string;
  status: string;
}

export interface logoutResponse {
  status: string;
  message: string;
}

export interface checkStatusResponse {
  message: string;
  status: string;
}
