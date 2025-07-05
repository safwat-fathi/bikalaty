export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  rating: number;
  brand: string;
  description: string;
  category: string;
  isNew?: boolean;
  discount?: number;
  unit?: string;
  wholesalePrice?: number;
  retailPrice?: number;
  minWholesaleQty?: number;
  minRetailQty?: number;
};

export type CartItem = Product & {
  quantity: number;
  // subtotal: number;
};
