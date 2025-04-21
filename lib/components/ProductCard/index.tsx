"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

import HeartIcon from "@/lib/icons/HeartIcon";
import ShoppingCartIcon from "@/lib/icons/ShoppingCartIcon";
import StarIcon from "@/lib/icons/StarIcon";
import { useCart } from "@/lib/providers/cart.provider";
import { useUser } from "@/lib/providers/user.provider";
import { useWishlist } from "@/lib/providers/wishlist.provider";
import { CartItem, Product } from "@/types/models/product.model";
import { UserType } from "@/types/models/user.model";

import Button from "../Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(wishlist.some((item: any) => item.id === product.id));
  const { userType } = useUser();

  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInWishlist) addToWishlist(product);
    else removeFromWishlist(product.id);

    setIsInWishlist(!isInWishlist);

    if (!isInWishlist) {
      toast.success(`${product.name} added to your wishlist`);
    } else {
      toast.info(`${product.name} removed from your wishlist`);
    }
  };

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newCartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    addToCart(newCartItem);
  };

  // Calculate price based on user type
  const getPrice = () => {
    switch (userType) {
      case UserType.Wholesaler:
        return product.wholesalePrice || product.price * 0.7; // 30% discount for wholesalers
      case UserType.Retailer:
        return product.retailPrice || product.price * 0.85; // 15% discount for retailers
      default:
        return product.price;
    }
  };

  // Get minimum quantity based on user type
  const getMinQty = () => {
    switch (userType) {
      case UserType.Wholesaler:
        return product.minWholesaleQty || 10;
      case UserType.Retailer:
        return product.minRetailQty || 5;
      default:
        return 1;
    }
  };

  // Show appropriate badges based on user type
  const showMinimumQtyBadge = userType !== UserType.Customer;

  const currentPrice = getPrice();
  const minQty = getMinQty();

  // todo: use Intercepting Routes to show product details in modal
  return (
    <div className="group animate-fadeIn overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/img-placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              priority={false}
            />
          </div>

          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <div className="badge badge-info opacity-85">New</div>}
            {product.discount && <div className="badge badge-warning opacity-85">-{product.discount}%</div>}
            {showMinimumQtyBadge && <div className="badge opacity-85">Min: {minQty}</div>}
            {userType === UserType.Wholesaler && <div className="badge badge-secondary opacity-85">Wholesale</div>}
            {userType === UserType.Retailer && <div className="badge badge-primary opacity-85">Retail</div>}
          </div>

          {/* Wishlist button */}
          <button
            title="Add to wishlist"
            className={`absolute top-2 right-2 rounded-full p-1.5 ${
              isInWishlist ? "bg-red-50 text-red-500" : "bg-white/80 text-gray-400 hover:text-red-500"
            } transition-colors`}
            onClick={toggleWishlist}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        </Link>
      </div>

      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <div className="mb-1 text-xs text-gray-500">{product.category}</div>
          <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] font-medium text-gray-800">{product.name}</h3>

          <div className="mb-2 flex items-center">
            <div className="mr-1 flex items-center text-amber-400">
              <StarIcon className="h-3.5 w-3.5 fill-current" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className={`text-lg font-semibold ${userType !== UserType.Customer ? "text-primary" : ""}`}>
                ${currentPrice.toFixed(2)}
              </span>
              {userType === UserType.Customer && product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {userType !== UserType.Customer && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
              )}
              {product.unit && <span className="ml-1 text-xs text-gray-500">/{product.unit}</span>}
            </div>
          </div>
        </Link>

        <div className="mt-3">
          <Button className="btn-primary btn-sm w-full" onClick={handleAddToCart}>
            <ShoppingCartIcon className="ms-1 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
