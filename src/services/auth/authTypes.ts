import { JwtPayload } from "jwt-decode";

export interface loginResponse {
  data: {
    access_token: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    is_root: boolean;
  }
  status: string;
}

export interface loginServiceResponse {
  userUuid: string;
  firstName: string;
  lastName: string;
  isRoot: boolean;
}

export interface logoutResponse {
  status: string;
  message: string;
}

export interface checkStatusResponse {
  status: string;
  data: {
    user_uuid: string;
    first_name: string;
    last_name: string;
    is_root: boolean;
  }
}

export interface AccessTokenPayload extends JwtPayload {
  user_uuid: string;
  is_root: boolean;
}
