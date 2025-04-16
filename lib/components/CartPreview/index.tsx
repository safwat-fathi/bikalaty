"use client";

import Image from "next/image";
import Link from "next/link";

import ChevronRightIcon from "@/lib/icons/ChevronRightIcon";
import ShoppingCartIcon from "@/lib/icons/ShoppingCartIcon";
import { useCart } from "@/lib/providers/cart.provider";

import Button from "../Button";

interface CartPreviewProps {
  cartItems: any[];
}

const CartPreview = ({ cartItems }: CartPreviewProps) => {
  const { cartSubTotal, incrementQuantity, decrementQuantity } = useCart();

  return (
    <>
      <div className="max-h-[50vh] flex-1 overflow-y-auto p-4">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center rounded-md border">
                      <button
                        className="cursor-pointer px-2 py-1 text-gray-500 hover:text-gray-700"
                        onClick={() => decrementQuantity(item)}
                      >
                        -
                      </button>
                      <span className="px-2 py-1">{item.quantity}</span>
                      <button
                        className="cursor-pointer px-2 py-1 text-gray-500 hover:text-gray-700"
                        onClick={() => incrementQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <ShoppingCartIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
            <p className="mb-4 text-gray-500">Start adding items to your cart!</p>
            {/* <Button onClick={handleClose}>Start Shopping</Button> */}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t px-4 py-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${cartSubTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">$3.99</span>
          </div>
          <div className="flex justify-between py-2 font-semibold">
            <span>Total</span>
            <span>${(cartSubTotal + 3.99).toFixed(2)}</span>
          </div>

          <div className="mt-4 flex flex-col gap-1 space-y-2">
            <Link href="/checkout">
              <Button variant="primary" className="w-full">
                Proceed to Checkout
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {/* <Button variant="neutral" className="w-full">
              Continue Shopping
            </Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CartPreview;
