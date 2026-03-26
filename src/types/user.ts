export type User = {
  id: string;
  email: string;
  name: string;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

export type OrderItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};
