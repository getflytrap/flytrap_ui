import { Project } from "../../types/index";

export interface getAllProjectsResponse {
  status: string;
  data: {
    projects: Project[];
    total_pages: number;
    issue_count: number;
  }
}

export interface createProjectResponse {
  uuid: string;
  name: string;
}
