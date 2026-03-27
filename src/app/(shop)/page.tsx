import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import type { Category } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

// --- Hero Section ---

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Tu tienda de{" "}
          <span className="text-[#3B82F6]">tecnologia</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Encuentra las mejores computadoras, componentes y accesorios al mejor
          precio. Envios a todo el pais.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/products"
            className="rounded-full bg-[#3B82F6] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Ver Productos
          </Link>
          <Link
            href="/categories"
            className="rounded-full border border-slate-600 px-8 py-3 font-semibold text-white transition-colors hover:border-slate-400"
          >
            Categorias
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Categories Section ---

async function CategoriesSection() {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch {
    // API not available yet, show placeholders
    categories = [];
  }

  if (categories.length === 0) {
    // Fallback categories while backend is not connected
    const fallback = [
      { name: "Laptops", slug: "laptops", image: "" },
      { name: "Desktops", slug: "desktops", image: "" },
      { name: "Componentes", slug: "componentes", image: "" },
      { name: "Accesorios", slug: "accesorios", image: "" },
    ];

    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold">Categorias</h2>
        <p className="mt-2 text-slate-400">Explora nuestras categorias</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fallback.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative flex h-48 items-end overflow-hidden rounded-xl bg-slate-800 p-6 transition-all hover:ring-2 hover:ring-[#3B82F6]"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <h3 className="relative text-xl font-bold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold">Categorias</h2>
      <p className="mt-2 text-slate-400">Explora nuestras categorias</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((cat) => {
          const catImage = cat.image && cat.image.trim() !== ""
            ? cat.image
            : PLACEHOLDER_IMAGE;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug ?? cat.id}`}
              className="group relative flex h-48 items-end overflow-hidden rounded-xl bg-slate-800 p-6 transition-all hover:ring-2 hover:ring-[#3B82F6]"
            >
              <Image
                src={catImage}
                alt={cat.name || "Categoria"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <h3 className="relative text-xl font-bold">{cat.name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// --- Featured Products Section ---

async function FeaturedProductsSection() {
  let products: Product[] = [];

  try {
    const res = await getProducts(1, 6);
    products = res.data;
  } catch {
    // API not available yet
    products = [];
  }

  if (products.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold">Productos Destacados</h2>
        <p className="mt-2 text-slate-400">Los productos mas populares</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
            >
              <div className="aspect-square animate-pulse rounded-md bg-slate-700" />
              <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-700" />
              <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-700" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Productos Destacados</h2>
          <p className="mt-2 text-slate-400">Los productos mas populares</p>
        </div>
        <Link
          href="/products"
          className="text-[#3B82F6] hover:underline"
        >
          Ver todos &rarr;
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id ?? index} product={product} />
        ))}
      </div>
    </section>
  );
}

// --- Loading Fallbacks ---

function CategoriesSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-700" />
      <div className="mt-2 h-5 w-64 animate-pulse rounded bg-slate-700" />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-800" />
        ))}
      </div>
    </section>
  );
}

function ProductsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="h-8 w-64 animate-pulse rounded bg-slate-700" />
      <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-700" />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
          >
            <div className="aspect-square animate-pulse rounded-md bg-slate-700" />
            <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-700" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-700" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Force dynamic rendering (depends on API data)
export const dynamic = "force-dynamic";

// --- Page ---

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
    </>
  );
}
