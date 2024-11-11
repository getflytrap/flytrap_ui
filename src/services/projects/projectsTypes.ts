import { Project } from "../../types/index";

export interface getAllProjectsResponse {
  data: {
    projects: Project[];
    total_pages: number;
    issue_count: number;
  }
  message: string;  
}

export interface createProjectResponse {
  uuid: string;
  name: string;
}
