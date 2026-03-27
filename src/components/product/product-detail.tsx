"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const imageSrc =
    product.imageUrl && product.imageUrl.trim() !== ""
      ? product.imageUrl
      : PLACEHOLDER_IMAGE;

  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        productId: product.id,
        title: product.name,
        price: Number(product.price),
        image: imageSrc,
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      {/* Imagen principal */}
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info del producto */}
      <div className="flex w-full flex-col lg:w-1/2">
        {product.category && (
          <span className="text-sm font-medium text-blue-400">
            {product.category.name}
          </span>
        )}

        <h1 className="mt-1 text-3xl font-bold text-white">{product.name}</h1>

        <p className="mt-4 text-3xl font-bold text-white">
          {formatPrice(Number(product.price))}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {inStock ? (
            <span className="text-green-400">En stock ({product.stock} disponibles)</span>
          ) : (
            <span className="text-red-400">Agotado</span>
          )}
        </p>

        <p className="mt-6 leading-relaxed text-slate-300">
          {product.description}
        </p>

        {/* Selector de cantidad */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm font-medium text-slate-300">Cantidad:</span>
          <div className="flex items-center rounded-md border border-slate-600">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={!inStock || quantity <= 1}
              className="px-3 py-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              -
            </button>
            <span className="min-w-[3rem] px-2 py-2 text-center text-sm font-medium text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
              disabled={!inStock || quantity >= product.stock}
              className="px-3 py-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        {/* Botón agregar al carrito */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-6 w-full rounded-md bg-[#3B82F6] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
