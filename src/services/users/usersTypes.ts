export interface CreateAccountRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmed_password: string;
}

export interface CreateAccountResponse {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_root: boolean;
  created_at: string; // ISO Date string
}

export interface UserProjectsResponse {
  projects: {
    project_uuid: string;
    name: string;
  }[];
  total_pages: number;
  current_page: number;
}
