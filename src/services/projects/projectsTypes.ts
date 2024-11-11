// To-do add generic response type with a status attr in a general types file?

export interface Project {
  uuid: string;
  name: string;
  issue_count: number;
}

export interface getAllProjectsResponse {
  projects:  Project[];
  total_pages: number;
  number: number;
}

export interface createProjectResponse {
  'uuid': string;
  'name': string;
}

