import type { Localized } from "./products";

export type Carrier = "mci" | "irancell" | "rightel";
export type SimType = "prepaid" | "postpaid";
export type SimTier = "regular" | "vip";

export type SimCard = {
  id: string;
  number: string;
  carrier: Carrier;
  type: SimType;
  tier: SimTier;
  price: number;
  pattern: Localized;
  patternTags: string[];
  features: Localized[];
  inStock: boolean;
};

export const simCards: SimCard[] = [
  {
    id: "s1",
    number: "0912 000 4567",
    carrier: "mci",
    type: "postpaid",
    tier: "regular",
    price: 8_500_000,
    pattern: { en: "Easy recall", fa: "به‌یادماندنی" },
    patternTags: ["easy"],
    features: [
      { en: "Instant eSIM", fa: "eSIM فوری" },
      { en: "Number guarantee", fa: "تضمین شماره" },
    ],
    inStock: true,
  },
  {
    id: "s2",
    number: "0912 111 2233",
    carrier: "mci",
    type: "prepaid",
    tier: "vip",
    price: 42_000_000,
    pattern: { en: "Repeated pairs", fa: "جفت تکراری" },
    patternTags: ["repeated", "easy"],
    features: [
      { en: "Golden series", fa: "سری طلایی" },
      { en: "Retail activation", fa: "فعال‌سازی حضوری" },
    ],
    inStock: true,
  },
  {
    id: "s3",
    number: "0912 555 5100",
    carrier: "mci",
    type: "prepaid",
    tier: "vip",
    price: 65_000_000,
    pattern: { en: "Four identical digits", fa: "چهار رقم یکسان" },
    patternTags: ["fourSame"],
    features: [
      { en: "Quad series", fa: "سری چهارتایی" },
      { en: "Ownership deed", fa: "سند مالکیت" },
    ],
    inStock: true,
  },
  {
    id: "s4",
    number: "0912 345 6789",
    carrier: "mci",
    type: "prepaid",
    tier: "regular",
    price: 6_200_000,
    pattern: { en: "Ascending sequence", fa: "ترتیب صعودی" },
    patternTags: ["ascending", "easy"],
    features: [{ en: "Prepaid bonus pack", fa: "بسته هدیه اعتباری" }],
    inStock: true,
  },
  {
    id: "s5",
    number: "0935 888 8080",
    carrier: "irancell",
    type: "prepaid",
    tier: "vip",
    price: 38_500_000,
    pattern: { en: "Four identical digits", fa: "چهار رقم یکسان" },
    patternTags: ["fourSame"],
    features: [
      { en: "4G/5G ready", fa: "پشتیبانی 4G/5G" },
      { en: "eSIM available", fa: "eSIM موجود" },
    ],
    inStock: true,
  },
  {
    id: "s6",
    number: "0935 246 8135",
    carrier: "irancell",
    type: "postpaid",
    tier: "regular",
    price: 9_800_000,
    pattern: { en: "Symmetric pattern", fa: "الگوی قرینه" },
    patternTags: ["mirror"],
    features: [{ en: "Unlimited social bundle", fa: "بسته نامحدود شبکه اجتماعی" }],
    inStock: true,
  },
  {
    id: "s7",
    number: "0936 777 7000",
    carrier: "irancell",
    type: "prepaid",
    tier: "vip",
    price: 55_000_000,
    pattern: { en: "Four identical digits", fa: "چهار رقم یکسان" },
    patternTags: ["fourSame", "easy"],
    features: [
      { en: "Premium series", fa: "سری ویژه" },
      { en: "Free eSIM", fa: "eSIM رایگان" },
    ],
    inStock: true,
  },
  {
    id: "s8",
    number: "0920 121 2121",
    carrier: "irancell",
    type: "prepaid",
    tier: "regular",
    price: 4_900_000,
    pattern: { en: "Repeated pairs", fa: "جفت تکراری" },
    patternTags: ["repeated"],
    features: [{ en: "Starter credit", fa: "اعتبار اولیه" }],
    inStock: true,
  },
  {
    id: "s9",
    number: "0921 999 9090",
    carrier: "rightel",
    type: "postpaid",
    tier: "vip",
    price: 48_000_000,
    pattern: { en: "Four identical digits", fa: "چهار رقم یکسان" },
    patternTags: ["fourSame"],
    features: [
      { en: "Corporate transferable", fa: "قابل انتقال شرکتی" },
      { en: "VIP support line", fa: "خط پشتیبانی VIP" },
    ],
    inStock: true,
  },
  {
    id: "s10",
    number: "0921 456 6540",
    carrier: "rightel",
    type: "prepaid",
    tier: "regular",
    price: 5_400_000,
    pattern: { en: "Symmetric pattern", fa: "الگوی قرینه" },
    patternTags: ["mirror"],
    features: [{ en: "Rich package", fa: "بسته غنی" }],
    inStock: true,
  },
  {
    id: "s11",
    number: "0912 000 0011",
    carrier: "mci",
    type: "postpaid",
    tier: "vip",
    price: 78_000_000,
    pattern: { en: "Rare zero series", fa: "سری نادر صفر" },
    patternTags: ["easy", "repeated"],
    features: [
      { en: "Collector series", fa: "سری کلکسیونی" },
      { en: "Notarized deed", fa: "سند محضری" },
    ],
    inStock: false,
  },
  {
    id: "s12",
    number: "0935 131 3131",
    carrier: "irancell",
    type: "prepaid",
    tier: "regular",
    price: 7_100_000,
    pattern: { en: "Repeated pairs", fa: "جفت تکراری" },
    patternTags: ["repeated", "easy"],
    features: [{ en: "eSIM ready", fa: "آماده eSIM" }],
    inStock: true,
  },
];

export const carriers: Carrier[] = ["mci", "irancell", "rightel"];
export const patternTagList = ["fourSame", "mirror", "ascending", "repeated", "easy"] as const;
export type PatternTag = (typeof patternTagList)[number];
