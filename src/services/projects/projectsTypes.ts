import { Project } from "../../types/index";

export interface getAllProjectsResponse {
  projects: Project[];
  total_pages: number;
  issue_count: number;
}

export interface createProjectResponse {
  data: {
    uuid: string;
    name: string;
  }
}
