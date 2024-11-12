import { ErrorData, Rejection } from "../../types/index";

export interface GetIssuesResponse {
  status: string;
  data: {
    issues: (ErrorData | Rejection)[];
    total_pages: number;
    current_page: number;
  };
}
