/* eslint-disable sonarjs/no-duplicate-string */

import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import Button from "@/lib/components/Button";
import { getScopedI18n } from "@/locales/server";

import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroSlider from "./components/HeroSlider";
import UserType from "./components/UserType";

export async function generateMetadata(): Promise<Metadata> {
  const tHome = await getScopedI18n("home");

  return {
    title: tHome("title"),
    description: tHome("description"),
  };
}

// Sample data for the slides
const sampleSlides = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww", // Replace with your actual image path
    title: "Fresh Vegetables Delivered",
    description: "Get the freshest greens and seasonal vegetables delivered right to your doorstep.",
    ctaText: "Shop Veggies",
    ctaLink: "/categories/vegetables",
    altText: "Assortment of fresh vegetables",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww", // Replace with your actual image path
    title: "Organic Fruits Weekly Deals",
    description: "Juicy, organic fruits are now on sale. Don't miss out!",
    ctaText: "View Deals",
    ctaLink: "/deals",
    altText: "Basket of organic fruits",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww", // Replace with your actual image path
    title: "Stock Your Pantry",
    description: "Everything you need from pasta and rice to sauces and snacks.",
    ctaText: "Shop Pantry",
    ctaLink: "/categories/pantry",
    altText: "Shelves stocked with pantry staples",
  },
];

export default async function Home() {
  // const tHome = await getScopedI18n("home");

  return (
    <>
      <HeroSlider slides={sampleSlides} autoplayInterval={30000} />

      <Suspense fallback={<div>Loading...</div>}>
        <Categories />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProducts />
      </Suspense>

      <UserType />

      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-6 md:p-8">
              <h3 className="font-heading mb-3 text-2xl font-bold">Become a Wholesaler</h3>
              <p className="mb-6 text-gray-600">
                Get access to wholesale prices and bulk ordering options. Perfect for restaurants, cafes, and small
                businesses.
              </p>
              <Link href="/login">
                <Button className="btn-primary btn-lg text-white">Apply Now</Button>
              </Link>
            </div>
            <div className="rounded-xl bg-lime-50 p-6 md:p-8">
              <h3 className="font-heading mb-3 text-2xl font-bold">Become a Retailer</h3>
              <p className="mb-6 text-gray-600">
                Join our network of retailers and offer our high-quality products in your store with competitive
                pricing.
              </p>
              <Link href="/login">
                <Button className="btn-primary btn-lg text-white">Apply Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
