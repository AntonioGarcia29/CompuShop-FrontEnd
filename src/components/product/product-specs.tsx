import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductSpecs({ product }: { product: Product }) {
  const specs = [
    { label: "Precio", value: formatPrice(Number(product.price)) },
    { label: "Stock", value: product.stock > 0 ? `${product.stock} unidades` : "Agotado" },
    ...(product.category
      ? [{ label: "Categoria", value: product.category.name }]
      : []),
    {
      label: "Publicado",
      value: new Date(product.createdAt).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50">
      <h2 className="border-b border-slate-700 px-6 py-4 text-lg font-semibold text-white">
        Especificaciones
      </h2>
      <dl className="divide-y divide-slate-700">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between px-6 py-3"
          >
            <dt className="text-sm text-slate-400">{spec.label}</dt>
            <dd className="text-sm font-medium text-white">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
