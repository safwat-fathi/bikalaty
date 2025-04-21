import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

interface WishlistProviderContext {
  wishlist: any[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (itemId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistProviderContext | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};

// todo: add wishlist to local storage
// todo: sync wishlist to database
// todo: use optimistic ui updates
export const WishlistProvider = ({ children, wishlistItems }: { children: ReactNode; wishlistItems: any[] }) => {
  const [wishlist, setWishlist] = useState<any[]>(wishlistItems);

  const addToWishlist = (product: any) => {
    setWishlist((prevWishlist: any) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlist((prevWishlist: any) => prevWishlist.filter((item: any) => item.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = useMemo(
    () => ({ wishlist, addToWishlist, removeFromWishlist, clearWishlist }),
    [wishlist, addToWishlist, removeFromWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
