import { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

import { MiddlewareFactory } from "@/types";
import { AppLocale } from "@/types/locale";

const locales: AppLocale[] = ["ar", "en"];

const defaultLocale: AppLocale = "en";

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
});

export const withI18n: MiddlewareFactory = () => {
  return async (request: NextRequest) => {
    return I18nMiddleware(request);
  };
};
