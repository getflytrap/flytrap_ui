import { ErrorData, Rejection } from "../../types/index";

export interface GetIssuesRequest {
  projectId: string;
  selectedHandled: boolean | null;
  selectedTime: string | never;
  currentPage: number;   
  limit: number;           
}

export interface GetIssuesResponse {
  issues: ErrorData | Rejection[];
  totalPages: number;
  currentPage: number;
}
