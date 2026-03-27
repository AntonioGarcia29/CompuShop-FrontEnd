import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import type { Category, PaginatedResponse } from "@/lib/api";
import type { Product } from "@/types/product";
import { ProductCatalog } from "./product-catalog";

export const dynamic = "force-dynamic";

const PRODUCTS_PER_PAGE = 12;

// Fallback categories when backend is unavailable
const FALLBACK_CATEGORIES: Category[] = [
  { id: "laptops", name: "Laptops", slug: "laptops", description: "" },
  { id: "desktops", name: "Desktops", slug: "desktops", description: "" },
  { id: "componentes", name: "Componentes", slug: "componentes", description: "" },
  { id: "accesorios", name: "Accesorios", slug: "accesorios", description: "" },
  { id: "monitores", name: "Monitores", slug: "monitores", description: "" },
];

const EMPTY_PRODUCTS: PaginatedResponse<Product> = {
  data: [],
  total: 0,
  page: 1,
  limit: PRODUCTS_PER_PAGE,
};

async function ProductsContent({
  resolvedParams,
}: {
  resolvedParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(resolvedParams.page ?? "1");
  const categoryId = (resolvedParams.category as string) || undefined;
  const search = (resolvedParams.search as string) || undefined;
  const minPrice = resolvedParams.minPrice
    ? Number(resolvedParams.minPrice)
    : undefined;
  const maxPrice = resolvedParams.maxPrice
    ? Number(resolvedParams.maxPrice)
    : undefined;

  const [products, categories] = await Promise.all([
    getProducts(page, PRODUCTS_PER_PAGE, {
      categoryId,
      search,
      minPrice,
      maxPrice,
    }).catch(() => EMPTY_PRODUCTS),
    getCategories().catch(() => FALLBACK_CATEGORIES),
  ]);

  return (
    <ProductCatalog
      products={products}
      categories={categories}
      activeSearch={search}
    />
  );
}

// Skeleton shown inside Suspense while ProductsContent loads
function CatalogSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-64">
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div className="h-6 w-32 animate-pulse rounded bg-slate-700" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-full animate-pulse rounded bg-slate-700"
              />
            ))}
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
            >
              <div className="aspect-square animate-pulse rounded-md bg-slate-700" />
              <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-700" />
              <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-slate-700" />
              <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-700" />
              <div className="mt-3 h-9 w-full animate-pulse rounded-md bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">Productos</h1>
      <p className="mt-2 text-slate-400">
        Explora nuestro catalogo de tecnologia
      </p>

      <Suspense
        key={JSON.stringify(resolvedParams)}
        fallback={<CatalogSkeleton />}
      >
        <ProductsContent resolvedParams={resolvedParams} />
      </Suspense>
    </section>
  );
}
