import axios from "axios";

interface ApiErrorPayload {
  message?: string;
  error?: string;
}

export function getErrorMessage(error: unknown, fallback = "An error occurred"): string {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    return error.response?.data.message ?? error.response?.data.error ?? error.message;
  }
  if (error instanceof Error) return error.message || fallback;
  console.error(error);
  return fallback;
}
