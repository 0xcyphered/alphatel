import type { Localized } from "./products";

export type Promo = {
  id: string;
  title: Localized;
  text: Localized;
  discount: number;
  href: string;
  accent: { from: string; to: string };
  code: string;
};

export const promos: Promo[] = [
  {
    id: "pr1",
    title: { en: "Galaxy week", fa: "هفته گلکسی" },
    text: {
      en: "Up to 12% off S24 series + free case",
      fa: "تا ۱۲٪ تخفیف سری S24 با قاب هدیه",
    },
    discount: 12,
    href: "/shop?brand=samsung",
    accent: { from: "#1e3a8a", to: "#3b82f6" },
    code: "GALAXY12",
  },
  {
    id: "pr2",
    title: { en: "Repair + accessory", fa: "تعمیر + لوازم جانبی" },
    text: {
      en: "Book any repair, get 20% off screen protectors",
      fa: "با رزرو هر تعمیر، ۲۰٪ تخفیف محافظ صفحه",
    },
    discount: 20,
    href: "/repair",
    accent: { from: "#7c2d12", to: "#ea580c" },
    code: "FIX20",
  },
  {
    id: "pr3",
    title: { en: "Academy bundle", fa: "بسته آموزشگاه" },
    text: {
      en: "Two courses together save 15%",
      fa: "خرید دو دوره هم‌زمان ۱۵٪ تخفیف",
    },
    discount: 15,
    href: "/academy",
    accent: { from: "#14532d", to: "#22c55e" },
    code: "LEARN15",
  },
];

export type Testimonial = {
  id: string;
  name: Localized;
  role: Localized;
  rating: number;
  text: Localized;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Sara Mohammadi", fa: "سارا محمدی" },
    role: { en: "iPhone 15 Pro owner", fa: "دارنده آیفون ۱۵ پرو" },
    rating: 5,
    text: {
      en: "Screen replaced in 40 minutes with a written warranty. Transparency you don't often see.",
      fa: "صفحه در ۴۰ دقیقه تعویض شد با گارانتی کتبی. شفافیتی که کم پیش می‌آید.",
    },
  },
  {
    id: "t2",
    name: { en: "Ahmad Rezaei", fa: "احمدرضا رضایی" },
    role: { en: "Academy graduate", fa: "دانش‌آموخته آموزشگاه" },
    rating: 5,
    text: {
      en: "Six months after the microsoldering course I opened my own bench. Instructors still answer my questions.",
      fa: "شش ماه بعد از دوره میکرولدرینگ کارگاه زدم. مدرس‌ها هنوز جواب سؤالم را می‌دهند.",
    },
  },
  {
    id: "t3",
    name: { en: "Zahra Hosseini", fa: "زهرا حسینی" },
    role: { en: "VIP number buyer", fa: "خریدار شماره VIP" },
    rating: 5,
    text: {
      en: "Found a golden 0912 number the same day. Papers and activation handled professionally.",
      fa: "همان روز شماره طلایی ۰۹۱۲ پیدا کردند. مدارک و فعال‌سازی حرفه‌ای انجام شد.",
    },
  },
];

export const storeInfo = {
  name: "AlphaTel",
  nameFa: "آلفاتل",
  tagline: {
    en: "Phones · Repair · SIM · Academy",
    fa: "فروش · تعمیر · سیم‌کارت · آموزش",
  },
  address: {
    en: "No. 24, Ferdowsi St., Enghelab Sq., Tehran, Iran",
    fa: "تهران، میدان انقلاب، خیابان فردوسی، پلاک ۲۴",
  },
  phones: ["021-9100-1234", "0912-9100-123"],
  emails: ["info@alphatel.example", "support@alphatel.example"],
  hours: {
    en: "Sat–Thu 10:00–21:00 · Fri 14:00–21:00",
    fa: "شنبه تا پنجشنبه ۱۰ تا ۲۱ · جمعه ۱۴ تا ۲۱",
  },
  mapQuery: "Enghelab Square, Tehran",
  coordinates: { lat: 35.6997, lng: 51.4119 },
  socials: {
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/989129100123",
  },
};

export type TeamMember = {
  id: string;
  name: Localized;
  role: Localized;
  bio: Localized;
  initials: string;
  accent: string;
};

export const team: TeamMember[] = [
  {
    id: "m1",
    name: { en: "Hossein Karimi", fa: "حسین کریمی" },
    role: { en: "Founder & CEO", fa: "بنیان‌گذار و مدیرعامل" },
    bio: {
      en: "Started with two repair benches in 2012. Obsessed with honest quotes.",
      fa: "کار را با دو میز تعمیر در ۱۳۹۱ شروع کرد. عاشق برآورد منصفانه.",
    },
    initials: "HK",
    accent: "#2563eb",
  },
  {
    id: "m2",
    name: { en: "Maryam Sadeghi", fa: "مریم صادقی" },
    role: { en: "Head of Repair Lab", fa: "مدیر آزمایشگاه تعمیرات" },
    bio: {
      en: "Board-level specialist leading a team of 14 certified technicians.",
      fa: "متخصص سطح برد و رهبر تیم ۱۴ نفره تکنسین‌های گواهی‌دار.",
    },
    initials: "MS",
    accent: "#7c3aed",
  },
  {
    id: "m3",
    name: { en: "Saman Rahimi", fa: "سامان رحیمی" },
    role: { en: "Academy Director", fa: "مدیر آموزشگاه" },
    bio: {
      en: "Designed the AlphaTel curriculum now used by 4,000+ graduates.",
      fa: "طراحی برنامه آموزشی آلفاتل که بیش از ۴۰۰۰ فارغ‌التحصیل دارد.",
    },
    initials: "SR",
    accent: "#059669",
  },
  {
    id: "m4",
    name: { en: "Niloufar Ebrahimi", fa: "نیلوفر ابراهیمی" },
    role: { en: "Retail Manager", fa: "مدیر فروشگاه" },
    bio: {
      en: "Makes sure every customer leaves with the right device — not the priciest.",
      fa: "حواستان هست هر مشتری دستگاه درست را ببرد، نه گران‌ترین را.",
    },
    initials: "NE",
    accent: "#db2777",
  },
];

export const stats = [
  { value: 40000, suffix: "+", key: "repairs" as const },
  { value: 18000, suffix: "+", key: "customers" as const },
  { value: 4000, suffix: "+", key: "courses" as const },
  { value: 49, suffix: "/50", key: "rating" as const },
];

export const certifications = [
  {
    id: "cert1",
    title: {
      en: "Apple Independent Repair Provider",
      fa: "تعمیرکار مستقل اپل (IRP)",
    },
    body: {
      en: "Genuine Apple parts and official calibration tools.",
      fa: "قطعات اصل اپل و ابزارهای کالیبراسیون رسمی.",
    },
  },
  {
    id: "cert2",
    title: {
      en: "Samsung Authorized Service",
      fa: "نمایندگی مجاز خدمات سامسونگ",
    },
    body: {
      en: "Factory-trained technicians for the full Galaxy line.",
      fa: "تکنسین‌های کارخانه‌آموزش برای کل سری گلکسی.",
    },
  },
  {
    id: "cert3",
    title: { en: "ISO 9001 processes", fa: "فرآیندهای ISO 9001" },
    body: {
      en: "Documented intake, QC and warranty workflow.",
      fa: "مستندسازی پذیرش، کنترل کیفیت و گارانتی.",
    },
  },
  {
    id: "cert4",
    title: {
      en: "Authorized carrier partner",
      fa: "پارت‌رنس رسمی اپراتورها",
    },
    body: {
      en: "Official SIM sales for MCI, Irancell and Rightel.",
      fa: "فروش رسمی سیم‌کارت همراه اول، ایرانسل و رایتل.",
    },
  },
];

export const payments = [
  "Mellat",
  "Saman",
  "Sepah",
  "ZarinPal",
  "Pay",
  "COD",
];
