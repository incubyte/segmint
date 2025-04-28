// API configuration
export const API_BASE_URL =
  (window as any).env?.NEXT_PUBLIC_API_URL ||
  import.meta.env?.VITE_API_URL ||
  "http://localhost:3000/api";
