const ACCESS_TOKEN_KEY = "supple_access_token";
const REFRESH_TOKEN_KEY = "supple_refresh_token";
const API_URL = "/api";

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalizedPath.replace(/\/+$/, "")}`;
}

export type AuthTokens = {
  access: string;
  refresh: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(tokens: AuthTokens) {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
}

export function clearTokens() {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function hasValidAccessToken(): boolean {
  const token = getAccessToken();
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") return false;

  return Date.now() < payload.exp * 1000;
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(apiUrl("/auth/refresh/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = (await response.json()) as { access?: string };
    if (!data.access) {
      clearTokens();
      return null;
    }

    const nextAccessToken = data.access;
    if (isBrowser()) {
      localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken);
    }

    return nextAccessToken;
  } catch {
    clearTokens();
    return null;
  }
}

export function getAuthHeaders(extraHeaders: Record<string, string> = {}) {
  const token = getAccessToken();

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
