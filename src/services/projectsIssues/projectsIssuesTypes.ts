import { ErrorData, Rejection } from "../../types/index";

export interface GetIssuesResponse {
  data: {
    issues: (ErrorData | Rejection)[];
    totalPages: number;
    currentPage: number;
  }
}
