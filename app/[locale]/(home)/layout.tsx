import { type ReactNode } from "react";

import Footer from "@/lib/components/Footer";
import Navbar from "@/lib/components/Navbar";
import Providers from "@/lib/providers";

const imgMilk =
  "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D";
// const imgBread =
//   "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDA%3D";
const imgBananas =
  "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww";
const imgAvocado =
  "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D";
// const imgFish =
//   "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww";

const fruitsAndVegetables = "Fruits & Vegetables";

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    originalPrice: 3.99,
    discount: 25,
    image: imgBananas,
    rating: 4.5,
    category: fruitsAndVegetables,
    unit: "bunch",
    wholesalePrice: 2.09,
    retailPrice: 2.55,
    minWholesaleQty: 10,
    minRetailQty: 5,
  },
  {
    id: 2,
    name: "Fresh Whole Milk",
    price: 3.49,
    image: imgMilk,
    rating: 4.7,
    category: "Dairy & Eggs",
    unit: "gallon",
    isNew: true,
    wholesalePrice: 2.49,
    retailPrice: 2.99,
    minWholesaleQty: 12,
    minRetailQty: 6,
  },
];

// Mock cart data
const cartItems = [
  {
    id: 4,
    name: "Free Range Eggs",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    category: "Dairy & Eggs",
    unit: "dozen",
    isNew: true,
    quantity: 1,
  },
  {
    id: 5,
    name: "Atlantic Salmon Fillet",
    price: 12.99,
    originalPrice: 14.99,
    discount: 13,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
    rating: 4.6,
    category: "Meat & Seafood",
    unit: "lb",
    quantity: 3,
  },
  {
    id: 6,
    name: "Organic Avocados",
    price: 6.99,
    image: imgAvocado,
    rating: 4.4,
    category: fruitsAndVegetables,
    unit: "bag",
    isNew: true,
    quantity: 1,
  },
  {
    id: 7,
    name: "Fresh Blueberries",
    price: 4.99,
    originalPrice: 5.99,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D",
    rating: 4.9,
    category: fruitsAndVegetables,
    unit: "pint",
    quantity: 1,
  },
];

export default async function HomeLayout({
  params,
  productModal,
  children,
}: Readonly<{
  children: ReactNode;
  productModal: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <Providers locale={locale} cartItems={cartItems} wishlistItems={wishlistItems}>
      <Navbar />
      {children}
      {productModal}
      <div className="relative" id="portal" />
      <div id="modal-root" />
      <Footer />
    </Providers>
  );
}
