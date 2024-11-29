export interface Project {
  uuid: string;
  name: string;
  issue_count: number;
  platform: string;
  api_key: string;
}

export interface User {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_root: boolean;
  created_at?: string; // ISO Date string
}

export interface CodeContext {
  file: string;
  line: number;
  column: number;
  context: string;
}

export interface ErrorData {
  uuid: string;
  name: string;
  message: string;
  created_at: string;
  file: string;
  line_number: number;
  col_number: number;
  project_uuid: string;
  stack_trace?: string;
  handled: boolean;
  resolved: boolean;
  contexts: CodeContext[];
  method?: string;
  path?: string;
  os?: string;
  browser?: string;
  runtime?: string;
  total_occurrences?: number;
  distinct_users?: number;
}

export interface FrameWithContext {
  frame: string;
  codeContext: CodeContext | null;
}

export interface Rejection {
  uuid: string;
  value: string;
  created_at: string;
  project_uuid: string;
  handled: boolean;
  resolved: boolean;
  method?: string;
  path?: string;
  os?: string;
  browser?: string;
  runtime?: string;
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

export interface WebSocketDataType {
  project_uuid: string;
  project_name: string;
  issue_data: object;
}

export interface ApiErrorResponse {
  message: string;
}

export interface AccountDataType {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirmed_password: string,
}