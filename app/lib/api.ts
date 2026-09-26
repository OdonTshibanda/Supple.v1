import {
  apiUrl,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  setTokens,
  type AuthTokens,
} from "./api/token";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  date: string;
  items: string;
  total: string;
  status: string;
};

export type CartItem = {
  name: string;
  quantity: number;
};

export class ApiRequestError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiRequestError";
  }
}

type RequestOptions = {
  authenticated?: boolean;
  retryAfterRefresh?: boolean;
};

type BackendUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type BackendOrder = {
  id: number | string;
  status: string;
  total_amount: number | string;
  created_at: string;
  items: Array<{ food_name: string; quantity: number }>;
};

type BackendFood = {
  id: number;
  name: string;
  isAvailable: boolean;
};

function errorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;

  const details = data as Record<string, unknown>;
  for (const key of ["detail", "error", "message"]) {
    if (typeof details[key] === "string") return details[key];
  }

  for (const value of Object.values(details)) {
    if (typeof value === "string") return value;
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  }

  return fallback;
}

function toUser(user: BackendUser): User {
  return {
    id: user.id,
    name: [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email,
    email: user.email,
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  { authenticated = true, retryAfterRefresh = true }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken = authenticated ? getAccessToken() : null;
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(path), { ...options, cache: "no-store", headers });
  } catch {
    throw new Error("Unable to reach the server. Please try again.");
  }

  if (response.status === 401 && authenticated && retryAfterRefresh) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      return request<T>(path, options, { authenticated, retryAfterRefresh: false });
    }
  }

  const data: unknown = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = errorMessage(data, "Something went wrong.");
    if (response.status === 401 && authenticated) clearTokens();
    throw new ApiRequestError(message, response.status);
  }

  return data as T;
}

export async function login(email: string, password: string): Promise<{ user: User }> {
  const tokens = await request<AuthTokens>(
    "/auth/login/",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    { authenticated: false, retryAfterRefresh: false },
  );

  if (!tokens.access || !tokens.refresh) {
    throw new Error("The server did not return valid authentication tokens.");
  }

  setTokens(tokens);
  try {
    return await getCurrentUser();
  } catch (error) {
    clearTokens();
    throw error;
  }
}

export async function register(name: string, email: string, password: string) {
  const [firstName = "", ...lastNameParts] = name.trim().split(/\s+/);

  return request<BackendUser>(
    "/auth/register/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        username: email,
        password,
        first_name: firstName,
        last_name: lastNameParts.join(" "),
      }),
    },
    { authenticated: false, retryAfterRefresh: false },
  );
}

export async function getCurrentUser(): Promise<{ user: User }> {
  const user = await request<BackendUser>("/auth/me/");
  return { user: toUser(user) };
}

export async function getOrders(): Promise<{ orders: Order[] }> {
  const response = await request<BackendOrder[] | { results?: BackendOrder[]; orders?: BackendOrder[] }>("/orders/");
  const backendOrders = Array.isArray(response) ? response : response.orders ?? response.results ?? [];

  return {
    orders: backendOrders.map((order) => ({
      id: String(order.id),
      date: new Date(order.created_at).toLocaleDateString(),
      items: order.items.map((item) => `${item.quantity} x ${item.food_name}`).join(", "),
      total: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(order.total_amount),
      ),
      status: order.status.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()),
    })),
  };
}

export async function createOrder(items: CartItem[]): Promise<{ id: string; total: string }> {
  const foods = await request<BackendFood[]>("/foods/", {}, { authenticated: false });
  const orderItems = items.map((item) => {
    const food = foods.find(
      (entry) => entry.isAvailable && entry.name.toLocaleLowerCase() === item.name.toLocaleLowerCase(),
    );
    if (!food) throw new Error(`${item.name} is currently unavailable.`);
    return { food: food.id, quantity: item.quantity };
  });

  const order = await request<BackendOrder>("/orders/", {
    method: "POST",
    body: JSON.stringify({ items: orderItems }),
  });

  return {
    id: String(order.id),
    total: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Number(order.total_amount),
    ),
  };
}

export async function requestPasswordReset(email: string): Promise<void> {
  await request(
    "/auth/password-reset/",
    { method: "POST", body: JSON.stringify({ email }) },
    { authenticated: false, retryAfterRefresh: false },
  );
}

export async function resetPassword(uid: string, token: string, password: string): Promise<void> {
  await request(
    "/auth/password-reset/confirm/",
    { method: "POST", body: JSON.stringify({ uid, token, password }) },
    { authenticated: false, retryAfterRefresh: false },
  );
}

export async function logout(): Promise<boolean> {
  const refresh = getRefreshToken();

  try {
    if (refresh) {
      await request(
        "/auth/logout/",
        { method: "POST", body: JSON.stringify({ refresh }) },
        { retryAfterRefresh: true },
      );
    }
    return true;
  } catch {
    return false;
  } finally {
    clearTokens();
  }
}

export function isUnauthenticatedError(error: unknown): boolean {
  return error instanceof ApiRequestError && error.status === 401;
}
