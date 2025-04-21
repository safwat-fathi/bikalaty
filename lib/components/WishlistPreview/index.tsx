"use client";

import Image from "next/image";

import HeartIcon from "@/lib/icons/HeartIcon";
import { useCart } from "@/lib/providers/cart.provider";
import { useWishlist } from "@/lib/providers/wishlist.provider";
import { CartItem, Product } from "@/types/models/product.model";

import Button from "../Button";

const WishlistPreview = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (item: Product) => {
    const newCartItem: CartItem = {
      ...item,
      quantity: 1,
    };

    addToCart(newCartItem);
  };

  return (
    <div className="max-h-[50vh] flex-1 overflow-y-auto p-4">
      {wishlist.length > 0 ? (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={item.image || "/img-placeholder.svg"}
                  alt={item.name}
                  width={25}
                  height={25}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-gray-600">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      className="btn-primary btn-xs min-h-auto"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to cart
                    </Button>
                    <Button
                      variant="ghost"
                      className="btn-xs min-h-auto text-red-500 hover:text-red-600"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <HeartIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium">Your wishlist is empty</h3>
          <p className="mb-4 text-gray-500">Start adding items to your wishlist!</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPreview;
