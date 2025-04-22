import { Modal } from "./modal";

export default async function ProductModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Modal>
      <p>Product Details of {id}</p>
    </Modal>
  );
}
