import { Error, Rejection } from "../../types/index";

export interface PaginationInfo {
  totalPages: number;
  currentPage: number;
}

export interface GetIssuesRequest {
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
