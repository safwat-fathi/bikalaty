import { ProductDetails } from "./components/ProductDetails";

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ProductDetails productId={id} />;
}
