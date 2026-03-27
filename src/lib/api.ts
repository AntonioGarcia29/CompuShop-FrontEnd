import type { Product } from "@/types/product";
import type { Cart } from "@/types/cart";
import type { Order } from "@/types/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// --- Types auxiliares ---

export type Category = {
  id: string;
  name: string;
  slug?: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type CreateOrderDto = {
  items: { productId: string; quantity: number }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

// --- Fetch wrapper ---

import { auth } from "@/lib/auth";

async function getToken(): Promise<string | null> {
  try {
    const session = await auth();
    return session?.accessToken ?? null;
  } catch {
    return null;
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = await getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// --- Products ---

export async function getProducts(
  page = 1,
  limit = 12,
  categoryId?: string
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (categoryId) params.set("categoryId", categoryId);
  return fetchApi(`/products?${params}`);
}

export async function getProduct(id: string): Promise<Product> {
  return fetchApi(`/products/${id}`);
}

// --- Categories ---

export async function getCategories(): Promise<Category[]> {
  return fetchApi("/categories");
}

export async function getCategory(slug: string): Promise<Category> {
  return fetchApi(`/categories/${slug}`);
}

// --- Cart ---

export async function getCart(): Promise<Cart> {
  return fetchApi("/cart");
}

export async function addToCart(
  productId: string,
  quantity: number
): Promise<Cart> {
  return fetchApi("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(
  productId: string,
  quantity: number
): Promise<Cart> {
  return fetchApi(`/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(productId: string): Promise<Cart> {
  return fetchApi(`/cart/${productId}`, {
    method: "DELETE",
  });
}

// --- Orders ---

export async function getOrders(): Promise<Order[]> {
  return fetchApi("/orders");
}

export async function getOrder(id: string): Promise<Order> {
  return fetchApi(`/orders/${id}`);
}

export async function createOrder(dto: CreateOrderDto): Promise<Order> {
  return fetchApi("/orders", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
