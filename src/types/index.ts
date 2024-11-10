export interface Project {
  uuid: string;
  name: string;
  issue_count: number;
};

export interface ErrorData {
  uuid: string;
  name: string;
  message: string;
  created_at: string;
  line_number: number;
  col_number: number;
  stack_trace?: string;
  handled: boolean;
  resolved: boolean;
}

export type HandledFilter = "All" | "Handled" | "Unhandled";
export type TimeFilter = "Today" | "Last 7 days" | "Last 14 days" | "Last 30 days" | "Last 90 days" | "Forever";
export type FilteredProperty = [string, string | number | boolean];