import type { CartItem as CartItemType } from "@/types/cart";

export function CartItem({ item }: { item: CartItemType }) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-200 py-4 dark:border-zinc-800">
      <div className="h-20 w-20 rounded-md bg-zinc-100 dark:bg-zinc-900" />
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Cantidad: {item.quantity}
        </p>
      </div>
      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}
