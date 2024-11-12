import { ErrorData, Rejection } from "../../types/index";

export interface GetIssuesResponse {
  status: string,
  data: {
    issues: (ErrorData | Rejection)[];
    totalPages: number;
    currentPage: number;
  }
}
