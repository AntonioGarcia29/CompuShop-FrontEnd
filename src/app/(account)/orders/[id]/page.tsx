type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <h1 className="text-3xl font-bold">Pedido #{id}</h1>
      {/* Detalle de la orden */}
    </section>
  );
}
