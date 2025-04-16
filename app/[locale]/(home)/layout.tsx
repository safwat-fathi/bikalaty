import { type ReactNode } from "react";

import Footer from "@/lib/components/Footer";
import Navbar from "@/lib/components/Navbar";
import Providers from "@/lib/providers";

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 6.99,
    image: "",
  },
  {
    id: 2,
    name: "Fresh Milk 2L",
    price: 8.79,
    image: "",
  },
];

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Organic Fruits",
    price: 1.99,
    quantity: 1,
    image: "",
  },
  {
    id: 2,
    name: "Fresh Milk 1L",
    price: 3.49,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    price: 4.29,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Organic Oranges",
    price: 2.09,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Fresh Milk 5L",
    price: 23.49,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D",
  },
];

export default async function HomeLayout({
  params,
  children,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <Providers locale={locale} cartItems={cartItems} wishlistItems={wishlistItems}>
      <Navbar />
      {children}
      <Footer />
    </Providers>
  );
}
