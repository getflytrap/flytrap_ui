import { ErrorData, Rejection } from "../../types/index";

export interface GetIssuesResponse {
  issues: (ErrorData | Rejection)[];
  totalPages: number;
  currentPage: number;
}
