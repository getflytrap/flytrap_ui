import axios from "axios";
import { ApiErrorResponse } from "../types";

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

export const parseStackTrace = (stackTrace: string, platform: string) => {
  const lines = stackTrace.split("\n");

  let frames;
  if (platform === "Flask") {
    frames = lines.reverse();
    const stackRegex = /^\s*File\s+"([^"]+)",\s+line\s+\d+/;
    frames = lines.filter((line) => stackRegex.test(line));
  } else {
    frames = lines
      .slice(1)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return frames;
};

export const logError = (error: unknown): void => {
  if (import.meta.env.MODE === 'development') {
    console.error(error);
  }
}

export const normalizeError = (error: unknown): Error => {
  // Normalize Axios errors
  if (axios.isAxiosError(error)) {
    if (error.request && !error.response) {
      return new Error("Network error. Please try again later.");
    }

    const apiMessage = (error.response?.data as ApiErrorResponse)?.message || "An unknown error occurred.";
    return new Error(apiMessage);
  }

  // Standard JS errors
  if (error instanceof Error) {
    return error;
  }

  // Unknown error types
  return new Error("An unknown error occurred.")
}