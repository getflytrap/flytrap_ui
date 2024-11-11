export interface CreateAccountRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmed_password: string;
}

export interface UserProjectsResponse {
  data: {
    projects: {
      project_uuid: string;
      name: string;
    }[];
    total_pages: number;
    current_page: number;
  };
  message: string;
}
