type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        Resultados para: {q || ""}
      </h1>
      {/* Resultados de búsqueda */}
    </section>
  );
}
