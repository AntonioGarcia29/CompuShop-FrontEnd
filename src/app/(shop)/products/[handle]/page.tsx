import type { Metadata } from "next";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: `Producto - ${handle}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { handle } = await params;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Producto: {handle}</h1>
      {/* Galería, descripción, variantes, agregar al carrito */}
    </section>
  );
}
