import { Project } from "../../types/index";

export interface getAllProjectsResponse {
  status: string;
  data: {
    projects: Project[];
    total_pages: number;
    issue_count: number;
  };
  message: string;
}

export interface createProjectResponse {
  status: string;
  data: {
    uuid: string;
    name: string;
    platform: string;
    api_key: string;
  };
}
