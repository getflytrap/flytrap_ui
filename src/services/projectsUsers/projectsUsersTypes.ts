export interface ProjectsUsersResponse {
  data: {
    users: {
      uuid: string;
      first_name: string;
      last_name: String;
    }
  };
  message: string;
}