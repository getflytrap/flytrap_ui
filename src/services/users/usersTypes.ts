import { Project } from "../../types";

export interface CreateAccountData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmed_password: string;
}

export interface UserProjectsResponse {
  data: {
    projects: Project[];
    total_pages: number;
    current_page: number;
  };
  status: string;
}
