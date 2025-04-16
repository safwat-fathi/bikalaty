"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";

import Loading from "@/app/[locale]/loading";
import { I18nProviderClient } from "@/locales/client";

import { CartProvider } from "./cart.provider";
import { UserProvider } from "./user.provider";
import { WishlistProvider } from "./wishlist.provider";

export default function Providers({
  children,
  locale,
  cartItems,
  wishlistItems,
}: PropsWithChildren<{
  locale: string;
  cartItems: any[];
  wishlistItems: any[];
}>) {
  return (
    <I18nProviderClient locale={locale} fallback={<Loading />}>
      <NuqsAdapter>
        <UserProvider user={null}>
          <WishlistProvider wishlistItems={wishlistItems}>
            <CartProvider cartItems={cartItems}>{children}</CartProvider>
          </WishlistProvider>
        </UserProvider>
      </NuqsAdapter>
    </I18nProviderClient>
  );
}
