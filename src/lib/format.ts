import type { Locale } from "@/i18n/config";

export function formatPrice(amount: number, locale: Locale): string {
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 0,
  });
  const number = formatter.format(amount);
  return locale === "fa" ? `${number} تومان` : `${number} IRT`;
}

export function formatCompactPrice(amount: number, locale: Locale): string {
  if (locale === "fa") {
    if (amount >= 1_000_000_000) return `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(amount / 1_000_000_000)} میلیارد`;
    if (amount >= 1_000_000) return `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(amount / 1_000_000)} میلیون`;
    return formatPrice(amount, locale);
  }
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B IRT`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M IRT`;
  return formatPrice(amount, locale);
}

export function formatCount(value: number, locale: Locale): string {
  if (value >= 1_000_000) {
    return `${new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
      maximumFractionDigits: 1,
    }).format(value / 1_000_000)}${locale === "fa" ? " میلیون" : "M"}`;
  }
  if (value >= 1_000) {
    return `${new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
      maximumFractionDigits: 1,
    }).format(value / 1_000)}${locale === "fa" ? " هزار" : "K"}`;
  }
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
    value,
  );
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
