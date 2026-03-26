import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-medium">{product.title}</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
