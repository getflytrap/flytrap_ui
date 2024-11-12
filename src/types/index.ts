export interface Project {
  uuid: string;
  name: string;
  issue_count: number;
}

export interface User {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_root: boolean;
  created_at?: string; // ISO Date string
}

export interface ErrorData {
  uuid: string;
  name: string;
  message: string;
  created_at: string;
  line_number: number;
  col_number: number;
  project_uuid: string;
  stack_trace?: string;
  handled: boolean;
  resolved: boolean;
}

export interface Rejection {
  uuid: string;
  value: string;
  created_at: string;
  project_uuid: string;
  handled: boolean;
  resolved: boolean;
}

export type HandledFilter = "All" | "Handled" | "Unhandled";
export type ResolvedFilter = "All" | "Resolved" | "Unresolved";

export type TimeFilter =
  | "Today"
  | "Last 7 days"
  | "Last 14 days"
  | "Last 30 days"
  | "Last 90 days"
  | "Forever";
export type FilteredProperty = [string, string | number | boolean];
