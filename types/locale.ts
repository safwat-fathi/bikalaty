export type AppLocale = "ar" | "en";

export const LocaleMapper: Record<AppLocale, "ar-SA" | "en-US"> = {
  ar: "ar-SA",
  en: "en-US",
} as const;
