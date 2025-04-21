import { Metadata } from "next";
import { Suspense } from "react";

import { getScopedI18n } from "@/locales/server";

import FeaturedProductsCard from "./components/FeaturedProductsCard";
import UserType from "./components/UserType";

export async function generateMetadata(): Promise<Metadata> {
  const tHome = await getScopedI18n("home");

  return {
    title: tHome("title"),
    description: tHome("description"),
  };
}

export default async function Home() {
  const tHome = await getScopedI18n("home");

  return (
    <>
      <h1>{tHome("title")}</h1>
      <p>{tHome("description")}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProductsCard />
      </Suspense>
      <UserType />
    </>
  );
}
