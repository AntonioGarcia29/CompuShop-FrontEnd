"use client";

import { useState } from "react";
import type { Cart, CartItem } from "@/types/cart";

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  function addItem(item: Omit<CartItem, "quantity">) {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.productId === item.productId);
      const items = existing
        ? prev.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev.items, { ...item, quantity: 1 }];
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items, total };
    });
  }

  function removeItem(productId: string) {
    setCart((prev) => {
      const items = prev.items.filter((i) => i.productId !== productId);
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items, total };
    });
  }

  return { cart, addItem, removeItem };
}
