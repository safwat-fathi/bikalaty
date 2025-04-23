"use client";

export function AddToCartButton({ productName }: { productName: string }) {
  // const {addToCart } = useCart();

  const handleClick = () => {
    // addToCart(productId);
  };
  return (
    <button className={`btn btn-primary w-full`} onClick={handleClick} aria-label={`Add ${productName} to cart`}>
      {/* {isAdding ? 'Adding...' : 'Add to Cart'} */}
      Add to Cart
    </button>
  );
}
