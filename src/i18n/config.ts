export const locales = ["fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export const dirMap: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
};
