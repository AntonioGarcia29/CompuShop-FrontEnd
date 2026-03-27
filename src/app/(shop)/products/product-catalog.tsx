"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { PriceRangeSlider } from "@/components/ui/price-range-slider";
import { useDebouncedValue } from "@/hooks/use-debounce";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import type { Category, PaginatedResponse } from "@/lib/api";

const PRICE_MIN = 0;
const PRICE_MAX = 10_000;

type Props = {
  products: PaginatedResponse<Product>;
  categories: Category[];
  activeSearch?: string;
};

export function ProductCatalog({ products, categories, activeSearch }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const currentCategory = searchParams.get("category") ?? "";
  const currentPage = Number(searchParams.get("page") ?? "1");
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");

  const [searchInput, setSearchInput] = useState(activeSearch ?? "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice ? Number(currentMinPrice) : PRICE_MIN,
    currentMaxPrice ? Number(currentMaxPrice) : PRICE_MAX,
  ]);

  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const debouncedPrice = useDebouncedValue(priceRange, 500);

  const totalPages = Math.max(1, Math.ceil(products.total / products.limit));

  const buildUrl = useCallback(
    (params: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          sp.set(key, value);
        } else {
          sp.delete(key);
        }
      }
      return `/products?${sp.toString()}`;
    },
    [searchParams]
  );

  // Live search: navigate when debounced value changes
  useEffect(() => {
    if (isInitialMount.current) return;
    router.push(
      buildUrl({ search: debouncedSearch.trim() || undefined, page: "1" })
    );
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live price filter: navigate when debounced slider value changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const [min, max] = debouncedPrice;
    router.push(
      buildUrl({
        minPrice: min > PRICE_MIN ? String(min) : undefined,
        maxPrice: max < PRICE_MAX ? String(max) : undefined,
        page: "1",
      })
    );
  }, [debouncedPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (categoryId: string) => {
    router.push(buildUrl({ category: categoryId || undefined, page: "1" }));
  };

  const handlePageChange = (page: number) => {
    router.push(buildUrl({ page: String(page) }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    router.push("/products");
  };

  const hasActiveFilters =
    activeSearch ||
    currentMinPrice ||
    currentMaxPrice ||
    currentCategory;

  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full shrink-0 lg:w-64">
        <div className="sticky top-24 space-y-6">
          {/* Buscador live */}
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h2 className="text-lg font-semibold text-white">Buscar</h2>
            <div className="relative mt-3">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nombre del producto..."
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 pr-10 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>

          {/* Categorias */}
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h2 className="text-lg font-semibold text-white">Categorias</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    currentCategory === ""
                      ? "bg-[#3B82F6] font-semibold text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Todas
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      currentCategory === cat.id
                        ? "bg-[#3B82F6] font-semibold text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Filtro de precios — slider */}
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h2 className="text-lg font-semibold text-white">Precio</h2>
            <div className="mt-4">
              <PriceRangeSlider
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={priceRange}
                onValueChange={setPriceRange}
                step={1000}
              />
            </div>
          </div>

          {/* Limpiar filtros */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {activeSearch && (
              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Busqueda: &quot;{activeSearch}&quot;
              </span>
            )}
            {currentMinPrice && (
              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Min: {formatPrice(Number(currentMinPrice))}
              </span>
            )}
            {currentMaxPrice && (
              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Max: {formatPrice(Number(currentMaxPrice))}
              </span>
            )}
            {currentCategory && (
              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Categoria:{" "}
                {categories.find((c) => c.id === currentCategory)?.name ??
                  currentCategory}
              </span>
            )}
          </div>
        )}

        {products.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-slate-400">
              No se encontraron productos.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 text-sm text-[#3B82F6] hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.data.map((product, index) => (
                <ProductCard key={product.id ?? index} product={product} />
              ))}
            </div>

            {/* Paginacion */}
            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  &larr; Anterior
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showEllipsis =
                        prev !== undefined && page - prev > 1;

                      return (
                        <span key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-sm text-slate-500">
                              ...
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`h-9 min-w-[36px] rounded-md text-sm font-medium transition-colors ${
                              page === currentPage
                                ? "bg-[#3B82F6] text-white"
                                : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  Siguiente &rarr;
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
