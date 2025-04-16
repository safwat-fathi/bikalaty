import { createContext, ReactNode, useContext, useMemo } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

type CartProviderContext = {
  cart: any[];
  cartSubTotal: number;
  cartItemsCount: number;
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  clearCart: () => void;
  incrementQuantity: (item: any) => void;
  decrementQuantity: (item: any) => void;
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

  const [cart, setCart] = useLocalStorage<any[]>("cart", cartItems);
  const [cartSubTotal, setCartSubTotal] = useLocalStorage("cartSubTotal", subtotal);
  const [cartItemsCount, setCartItemsCount] = useLocalStorage("cartItemsCount", itemsCount);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    setCartSubTotal(cartSubTotal + item.price);
    setCartItemsCount(cartItemsCount + 1);
  };

  const removeFromCart = (selectedItem: any) => {
    setCart(cart.filter((item) => selectedItem.id !== item.id));
    setCartSubTotal(cartSubTotal - selectedItem.price);
    setCartItemsCount(cartItemsCount - 1);
  };

  const clearCart = () => {
    setCart([]);
    setCartSubTotal(0);
    setCartItemsCount(0);
  };

  const incrementQuantity = (item: any) => {
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

  const decrementQuantity = (item: any) => {
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
