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
      uuid: string;
      name: string;
      issue_count: number;
    }[];
    total_pages: number;
    current_page: number;
  };
  status: string;
}
