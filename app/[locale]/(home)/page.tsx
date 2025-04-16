import { Metadata } from "next";

import { getScopedI18n } from "@/locales/server";

import Test from "./components/Test";
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
      <Test />
      <UserType />
    </>
  );
}
