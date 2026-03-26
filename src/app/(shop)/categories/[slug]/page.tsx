type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Categoria: {slug}</h1>
      {/* Productos filtrados por categoría */}
    </section>
  );
}
