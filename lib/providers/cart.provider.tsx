import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

import { CartItem, Product } from "@/types/models/product.model";

type CartProviderContext = {
  cart: CartItem[];
  cartSubTotal: number;
  cartItemsCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  incrementQuantity: (item: Product) => void;
  decrementQuantity: (item: Product) => void;
};

const CartContext = createContext<CartProviderContext | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// todo: add cart to local storage
// todo: sync cart to database
// todo: use optimistic ui updates
export const CartProvider = ({ children, cartItems }: { children: ReactNode; cartItems: any[] }) => {
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [cart, setCart] = useState<CartItem[]>(cartItems);
  const [cartSubTotal, setCartSubTotal] = useState(subtotal);
  const [cartItemsCount, setCartItemsCount] = useState(itemsCount);

  const addToCart = (item: CartItem) => {
    // check if already in cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      toast.error(`${item.name} is already in your cart`);
      return;
    }

    setCart([...cart, item]);
    setCartSubTotal(cartSubTotal + item.price);
    setCartItemsCount(cartItemsCount + 1);

    toast.success(`${item.name} added to your cart`);
  };

  const removeFromCart = (selectedItem: CartItem) => {
    setCart(cart.filter((item) => selectedItem.id !== item.id));
    setCartSubTotal(cartSubTotal - selectedItem.price * selectedItem.quantity);
    setCartItemsCount(cartItemsCount - 1);
  };

  const clearCart = () => {
    setCart([]);
    setCartSubTotal(0);
    setCartItemsCount(0);
  };

  const incrementQuantity = (item: Product) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
    setCartSubTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    setCartItemsCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const decrementQuantity = (item: Product) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
    setCartSubTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    setCartItemsCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartSubTotal,
      cartItemsCount,
      incrementQuantity,
      decrementQuantity,
    }),
    [cart, addToCart, removeFromCart, clearCart, cartSubTotal, cartItemsCount, incrementQuantity, decrementQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
