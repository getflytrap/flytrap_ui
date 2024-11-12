import { ErrorData, FilteredProperty } from "../types";

export const convertHandledToBoolean = (handled: string): boolean | null => {
  if (handled === "Handled") return true;
  if (handled === "Unhandled") return false;
  return null;
};

export const convertResolvedToBoolean = (resolved: string): boolean | null => {
  if (resolved === "Resolved") return true;
  if (resolved === "Unresolved") return false;
  return null;
};


export const convertToTimeStamp = (period: string): string | null => {
  const now = new Date();
  let pastDate: Date;

  switch (period) {
    case "Today":
      pastDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      break;
    case "Last 7 days":
      pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "Last 14 days":
      pastDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      break;
    case "Last 30 days":
      pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "Last 90 days":
      pastDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "Forever":
      return null;
    default:
      console.error("Invalid time period provided.");
      return null;
  }

  return pastDate.toISOString();
};

export const renameAndFilterProperties = (
  errorData: ErrorData | null,
): FilteredProperty[] => {
  if (!errorData) return []; // Handle null or undefined fetchedError by returning an empty array

  const result: FilteredProperty[] = [];
  for (const [key, value] of Object.entries(errorData)) {
    if (!value) continue;
    switch (key) {
      case "error_id":
        result.push(["Id", value]);
        break;
      case "name":
        result.push(["Name", value]);
        break;
      case "message":
        result.push(["Message", value]);
        break;
      case "created_at":
        result.push(["Created At", new Date(value).toLocaleString()]);
        break;
      case "line_number":
        result.push(["Line Number", value]);
        break;
      case "col_number":
        result.push(["Column Number", value]);
        break;
      case "handled":
        result.push(["Handled", value]);
        break;
    }
  }
  return result;
};
