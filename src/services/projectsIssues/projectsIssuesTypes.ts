export interface Error {
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

export interface Rejection {
  uuid: string;
  value: string;
  created_at: string;
  project_uuid: string;
  handled: boolean;
  resolved: boolean;
}

export interface PaginationInfo {
  totalPages: number;
  currentPage: number;
}

export interface GetErrorsRequest {
  projectId: string;
  selectedHandled: boolean | null;
  selectedTime: string | never;
  currentPage: number;   
  limit: number;           
}

export interface GetIssuesResponse extends PaginationInfo {
  errors: {
    issues: {
      errorLogs: Error[];
      rejectionLogs: Rejection[];
    }
  };
  totalPages: number;
  currentPage: number;
}
