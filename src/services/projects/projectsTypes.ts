// To-do add generic response type with a status attr in a general types file?

export interface getAllProjectsResponse {
  status: string;
  data:  { [key: string]: { [key: string]: number | string }[] } | number;
}

export interface createProjectResponse {
  status: string;
  data: {
    'uuid': string;
    'name': string;
  } | number;
}

