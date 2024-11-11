export type Project = {
  uuid: string;
  name: string;
  issue_count: number;
};

export type User {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_root: boolean;
  created_at: string; // ISO Date string
}

export type Error {
  uuid: string;
  name: string;
  message: string;
  created_at: string;
  line_number: number;
  col_number: number;
  project_uuid: string;
  handled: boolean;
  resolved: boolean;
}

export type Rejection {
  uuid: string;
  value: string;
  created_at: string;
  project_uuid: string;
  handled: boolean;
  resolved: boolean;
}