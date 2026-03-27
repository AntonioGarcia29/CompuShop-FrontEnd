"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export function ProductCard({ product }: { product: Product }) {
  const imageSrc =
    product.imageUrl && product.imageUrl.trim() !== ""
      ? product.imageUrl
      : PLACEHOLDER_IMAGE;

  return (
    <div className="group rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-md bg-slate-900">
          <Image
            src={imageSrc}
            alt={product.name || "Producto"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-white">{product.name}</h3>
          {product.category && (
            <p className="mt-1 text-xs text-blue-400">{product.category.name}</p>
          )}
          <p className="mt-1 text-sm font-semibold text-slate-300">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // TODO: integrate with cart context/API
        }}
        className="mt-3 w-full rounded-md bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
