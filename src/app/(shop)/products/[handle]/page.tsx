import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductSpecs } from "@/components/product/product-specs";
import { RelatedProducts } from "@/components/product/related-products";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;

  try {
    const product = await getProduct(handle);
    return {
      title: product.name,
      description: product.description,
    };
  } catch {
    return {
      title: "Producto no encontrado",
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { handle } = await params;

  let product;
  try {
    product = await getProduct(handle);
  } catch {
    notFound();
  }

  const related = product.categoryId
    ? await getProducts(1, 5, { categoryId: product.categoryId }).catch(
        () => ({ data: [], total: 0, page: 1, limit: 5 })
      )
    : { data: [], total: 0, page: 1, limit: 5 };

  const relatedProducts = related.data
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <ProductDetail product={product} />

      <div className="mt-12">
        <ProductSpecs product={product} />
      </div>

      <div className="mt-16">
        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
}
