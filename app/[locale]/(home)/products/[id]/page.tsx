export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <p>Product Details of {id}</p>
    </div>
  );
}
