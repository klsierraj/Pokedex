import { getToken } from "./auth";

const BASE_URL = "http://localhost:3000";

export function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();

  return fetch(BASE_URL + path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
