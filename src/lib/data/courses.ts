import type { Localized } from "./products";

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseFormat = "online" | "inPerson" | "hybrid";

export type CourseLesson = {
  title: Localized;
  duration: string;
};

export type CourseModule = {
  title: Localized;
  lessons: CourseLesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: Localized;
  subtitle: Localized;
  level: CourseLevel;
  format: CourseFormat;
  price: number;
  oldPrice?: number;
  durationWeeks: number;
  sessions: number;
  students: number;
  rating: number;
  certificate: boolean;
  featured?: boolean;
  badge?: "new" | "hot";
  accent: { from: string; to: string };
  instructor: {
    name: Localized;
    title: Localized;
    bio: Localized;
    initials: string;
  };
  outcomes: Localized[];
  requirements: Localized[];
  syllabus: CourseModule[];
  previewLength: string;
};

export const courses: Course[] = [
  {
    id: "c1",
    slug: "mobile-repair-foundation",
    title: {
      en: "Mobile Repair Foundation",
      fa: "مبانی تعمیرات موبایل",
    },
    subtitle: {
      en: "Tools, safety, disassembly and first diagnostics — start from zero.",
      fa: "ابزارها، ایمنی، باز کردن دستگاه و اولین عیب‌یابی‌ها — از صفر شروع کنید.",
    },
    level: "beginner",
    format: "hybrid",
    price: 4_900_000,
    oldPrice: 6_500_000,
    durationWeeks: 6,
    sessions: 18,
    students: 1240,
    rating: 4.8,
    certificate: true,
    featured: true,
    badge: "hot",
    accent: { from: "#0ea5e9", to: "#2563eb" },
    instructor: {
      name: { en: "Eng. Saman Rahimi", fa: "مهندس سامان رحیمی" },
      title: { en: "Lead instructor, 12 yrs bench experience", fa: "مدرس ارشد، ۱۲ سال تجربه عملی" },
      bio: {
        en: "Former authorized service center technician specialized in board-level diagnostics.",
        fa: "تکنسین سابق نمایندگی مجاز، متخصص عیب‌یابی در سطح برد.",
      },
      initials: "SR",
    },
    outcomes: [
      { en: "ESD-safe workspace setup", fa: "راه‌اندازی کارگاه ایمن ESD" },
      { en: "Confident teardown of 10+ popular models", fa: "باز کردن حرفه‌ای بیش از ۱۰ مدل پرفروش" },
      { en: "Basic multimeter measurements", fa: "اندازه‌گیری پایه با مالتی‌متر" },
      { en: "Customer intake & repair ticket writing", fa: "پذیرش مشتری و نوشتن تیکت تعمیر" },
    ],
    requirements: [
      { en: "No prior experience needed", fa: "نیاز به پیش‌نیاز نیست" },
      { en: "Smartphone to practice on", fa: "یک گوشی برای تمرین" },
    ],
    syllabus: [
      {
        title: { en: "Module 1 — Workshop & safety", fa: "درس ۱ — کارگاه و ایمنی" },
        lessons: [
          { title: { en: "Tools and consumables", fa: "ابزارها و ملزومات" }, duration: "45m" },
          { title: { en: "ESD and battery safety", fa: "ایمنی ESD و باتری" }, duration: "40m" },
        ],
      },
      {
        title: { en: "Module 2 — Device anatomy", fa: "درس ۲ — آناتومی دستگاه" },
        lessons: [
          { title: { en: "Display assemblies", fa: "اسمبلی نمایشگر" }, duration: "50m" },
          { title: { en: "Connectors and flex cables", fa: "کانکتورها و فلت‌ها" }, duration: "55m" },
        ],
      },
      {
        title: { en: "Module 3 — First diagnostics", fa: "درس ۳ — اولین عیب‌یابی‌ها" },
        lessons: [
          { title: { en: "Power rails with multimeter", fa: "مسیرهای تغذیه با مالتی‌متر" }, duration: "60m" },
          { title: { en: "Writing a clear repair ticket", fa: "نگارش تیکت شفاف تعمیر" }, duration: "30m" },
        ],
      },
    ],
    previewLength: "8:24",
  },
  {
    id: "c2",
    slug: "screen-battery-mastery",
    title: {
      en: "Screen & Battery Replacement Mastery",
      fa: "تسلط بر تعویض صفحه و باتری",
    },
    subtitle: {
      en: "The highest-demand paid repairs, done fast and safely.",
      fa: "پرتقاضاترین تعمیرات پولی، سریع و ایمن انجام بدهید.",
    },
    level: "beginner",
    format: "inPerson",
    price: 3_800_000,
    durationWeeks: 3,
    sessions: 9,
    students: 860,
    rating: 4.9,
    certificate: true,
    featured: true,
    accent: { from: "#f59e0b", to: "#ea580c" },
    instructor: {
      name: { en: "Shirin Ahmadi", fa: "شیرین احمدی" },
      title: { en: "Display specialist", fa: "متخصص نمایشگر" },
      bio: {
        en: "Completed 8,000+ screen replacements with a 99.4% first-pass yield.",
        fa: "بیش از ۸۰۰۰ تعویض صفحه با نرخ موفقیت ۹۹٫۴٪.",
      },
      initials: "SA",
    },
    outcomes: [
      { en: "OLED/LCD handling without damage", fa: "جابجایی OLED/LCD بدون آسیب" },
      { en: "True-tone / soft reset procedures", fa: "روش‌های تروتون و ریست نرم" },
      { en: "Battery pull-tab & adhesive work", fa: "کار با چسب و تب باتری" },
      { en: "Water damage triage basics", fa: "مبانی تریاژ آب‌خوردگی" },
    ],
    requirements: [
      { en: "Foundation course or equivalent skill", fa: "دوره مبانی یا مهارت هم‌ارز" },
    ],
    syllabus: [
      {
        title: { en: "Week 1 — Screens", fa: "هفته ۱ — نمایشگرها" },
        lessons: [
          { title: { en: "Adhesive chemistry", fa: "شیمی چسب‌ها" }, duration: "45m" },
          { title: { en: "Frame vs glass-only", fa: "فریم در برابر تعویض شیشه" }, duration: "55m" },
        ],
      },
      {
        title: { en: "Week 2 — Batteries", fa: "هفته ۲ — باتری" },
        lessons: [
          { title: { en: "Safe disconnect order", fa: "ترتیب ایمن قطع اتصال" }, duration: "40m" },
          { title: { en: "Swollen cell protocol", fa: "پروتکل باتری بادکرده" }, duration: "50m" },
        ],
      },
      {
        title: { en: "Week 3 — Speed drills", fa: "هفته ۳ — تمرین سرعت" },
        lessons: [
          { title: { en: "45-minute challenge", fa: "چالش ۴۵ دقیقه‌ای" }, duration: "90m" },
        ],
      },
    ],
    previewLength: "6:10",
  },
  {
    id: "c3",
    slug: "microsoldering-level1",
    title: {
      en: "Microsoldering Level 1",
      fa: "میکرولدرینگ سطح ۱",
    },
    subtitle: {
      en: "Hot air, rework station and your first board-level joints.",
      fa: "هویه گرم، استیشن و اولین اتصالات سطح برد.",
    },
    level: "intermediate",
    format: "inPerson",
    price: 12_500_000,
    durationWeeks: 8,
    sessions: 24,
    students: 320,
    rating: 4.9,
    certificate: true,
    featured: true,
    badge: "new",
    accent: { from: "#10b981", to: "#059669" },
    instructor: {
      name: { en: "Dr. Kian Mousavi", fa: "دکتر کیان موسوی" },
      title: { en: "Board-level engineer", fa: "مهندس سطح برد" },
      bio: {
        en: "PhD in electronics; trains service centers across the country.",
        fa: "دکترای الکترونیک؛ آموزش مراکز خدمات در سراسر کشور.",
      },
      initials: "KM",
    },
    outcomes: [
      { en: "Flux control and tip care", fa: "کنترل فلوکس و نگهداری نوک" },
      { en: "Remove & install QFN/IU packages", fa: "جدا و نصب پکیج QFN/IU" },
      { en: "Jumper wire repair for torn pads", fa: "ترمیم پد پاره با جامپر" },
      { en: "Understand schematics for power ICs", fa: "خواندن شماتیک آی‌سی‌های تغذیه" },
    ],
    requirements: [
      { en: "Foundation + 6 months practice", fa: "مبانی + ۶ ماه تمرین" },
      { en: "Own hot air station recommended", fa: "هویه گرم شخصی توصیه می‌شود" },
    ],
    syllabus: [
      {
        title: { en: "Phase 1 — Station craft", fa: "فاز ۱ — کار با استیشن" },
        lessons: [
          { title: { en: "Temperature profiles", fa: "پروفایل‌های دما" }, duration: "60m" },
          { title: { en: "Board shielding", fa: "شیلدینگ برد" }, duration: "50m" },
        ],
      },
      {
        title: { en: "Phase 2 — Packages", fa: "فاز ۲ — پکیج‌ها" },
        lessons: [
          { title: { en: "QFN rework", fa: "ری‌ورک QFN" }, duration: "75m" },
          { title: { en: "Connector reball basics", fa: "ری‌بال پایه اتصال‌دهنده" }, duration: "70m" },
        ],
      },
      {
        title: { en: "Phase 3 — Live repairs", fa: "فاز ۳ — تعمیرات واقعی" },
        lessons: [
          { title: { en: "Supervised customer devices", fa: "تعمیر نظارتی دستگاه مشتری" }, duration: "120m" },
        ],
      },
    ],
    previewLength: "11:02",
  },
  {
    id: "c4",
    slug: "ios-software-forensics",
    title: {
      en: "iOS Software & Data Recovery",
      fa: "نرم‌افزار iOS و بازیابی اطلاعات",
    },
    subtitle: {
      en: "DFU, baseband, activation locks handled ethically.",
      fa: "DFU، بیس‌باند و قفل فعالسازی به‌صورت اخلاقی.",
    },
    level: "advanced",
    format: "online",
    price: 8_900_000,
    durationWeeks: 5,
    sessions: 15,
    students: 410,
    rating: 4.7,
    certificate: true,
    featured: true,
    accent: { from: "#8b5cf6", to: "#6d28d9" },
    instructor: {
      name: { en: "Parsa Najafi", fa: "پارسا نجفی" },
      title: { en: "iOS specialist", fa: "متخصص iOS" },
      bio: {
        en: "Ex-genius-bar style trainer focused on firmware and recovery flows.",
        fa: "مربی سابق سبک جینیوس‌بار، متخصص فریمور و فلوهای بازیابی.",
      },
      initials: "PN",
    },
    outcomes: [
      { en: "DFU & recovery mode workflows", fa: "فلوهای DFU و ریکاوری" },
      { en: "Error code triage (4013, 9, 14…)", fa: "تشخیص کدهای خطا (4013, 9, 14…)" },
      { en: "Ethical activation lock policy", fa: "سیاست اخلاقی قفل فعالسازی" },
      { en: "Backup extraction basics", fa: "مبانی استخراج بکاپ" },
    ],
    requirements: [
      { en: "Comfort with Finder/iTunes", fa: "آشنایی با Finder/iTunes" },
      { en: "Mac or Windows PC", fa: "مک یا ویندوز" },
    ],
    syllabus: [
      {
        title: { en: "Week 1 — Firmware map", fa: "هفته ۱ — نقشه فریمور" },
        lessons: [
          { title: { en: "Boot chain explained", fa: "زنجیره بوت" }, duration: "55m" },
          { title: { en: "Signed IPSWs", fa: "آی‌پی‌اس‌دبلیوی امضاشده" }, duration: "40m" },
        ],
      },
      {
        title: { en: "Week 2 — Recovery drills", fa: "هفته ۲ — تمرین بازیابی" },
        lessons: [
          { title: { en: "Stuck-on-Apple-logo", fa: "گیر کردن روی لوگو" }, duration: "50m" },
          { title: { en: "Update failed loops", fa: "حلقه خطای بروزرسانی" }, duration: "45m" },
        ],
      },
    ],
    previewLength: "9:40",
  },
  {
    id: "c5",
    slug: "android-chipset-repair",
    title: {
      en: "Android Chipset & Power Repair",
      fa: "تعمیر چیپ‌ست و تغذیه اندروید",
    },
    subtitle: {
      en: "Qualcomm & MediaTek power trees, no-charge and dead-boot cases.",
      fa: "درخت تغذیه کوالکام و مدیاتک، حالت‌های شارژ نشدن و بوت نشدن.",
    },
    level: "advanced",
    format: "hybrid",
    price: 14_800_000,
    oldPrice: 17_000_000,
    durationWeeks: 10,
    sessions: 30,
    students: 185,
    rating: 4.8,
    certificate: true,
    badge: "new",
    accent: { from: "#ef4444", to: "#b91c1c" },
    instructor: {
      name: { en: "Eng. Maryam Sadeghi", fa: "مهندس مریم صادقی" },
      title: { en: "Power tree researcher", fa: "پژوهشگر مسیر تغذیه" },
      bio: {
        en: "Published repair notes used by 200+ workshops nationwide.",
        fa: "یادداشت‌های تعمیری که بیش از ۲۰۰ کارگاه در کشور استفاده می‌کنند.",
      },
      initials: "MS",
    },
    outcomes: [
      { en: "Read Android board schematics", fa: "خواندن شماتیک برد اندروید" },
      { en: "PA / PMIC diagnosis", fa: "عیب‌یابی PA و PMIC" },
      { en: "No-boot vs no-display isolation", fa: "تفکیک بوت نشدن از نمایش ندادن" },
      { en: "Case studies with before/after", fa: "مطالعات موردی قبل و بعد" },
    ],
    requirements: [
      { en: "Microsoldering Level 1", fa: "میکرولدرینگ سطح ۱" },
      { en: "Oscilloscope access helpful", fa: "اسیلوسکوپ مفید است" },
    ],
    syllabus: [
      {
        title: { en: "Block 1 — Power trees", fa: "بلوک ۱ — درخت تغذیه" },
        lessons: [
          { title: { en: "PMIC rails", fa: "مسیرهای PMIC" }, duration: "70m" },
          { title: { en: "Boot sequencing", fa: "ترتیب بوت" }, duration: "65m" },
        ],
      },
      {
        title: { en: "Block 2 — RF & charge", fa: "بلوک ۲ — RF و شارژ" },
        lessons: [
          { title: { en: "Charge IC failures", fa: "خرابی آی‌سی شارژ" }, duration: "60m" },
          { title: { en: "PA line checks", fa: "بررسی خطوط PA" }, duration: "55m" },
        ],
      },
    ],
    previewLength: "12:15",
  },
  {
    id: "c6",
    slug: "business-of-repair",
    title: {
      en: "Start Your Repair Business",
      fa: "راه‌اندازی کسب‌وکار تعمیرات",
    },
    subtitle: {
      en: "Pricing, inventory, branding and customer trust.",
      fa: "قیمت‌گذاری، موجودی، برندسازی و اعتماد مشتری.",
    },
    level: "intermediate",
    format: "online",
    price: 2_900_000,
    durationWeeks: 4,
    sessions: 8,
    students: 640,
    rating: 4.6,
    certificate: true,
    accent: { from: "#0f766e", to: "#134e4a" },
    instructor: {
      name: { en: "Hossein Karimi", fa: "حسین کریمی" },
      title: { en: "Founder, AlphaTel", fa: "بنیان‌گذار آلفاتل" },
      bio: {
        en: "Built a multi-store repair brand from a single bench in 2012.",
        fa: "از یک میز کاری در ۱۳۹۱، یک برند چندشعبه‌ای ساخت.",
      },
      initials: "HK",
    },
    outcomes: [
      { en: "Service menu & price list design", fa: "طراحی منوی خدمات و تعرفه" },
      { en: "Spare parts sourcing", fa: "تأمین قطعات یدکی" },
      { en: "Local SEO & Google profile", fa: "سئوی محلی و پروفایل گوگل" },
      { en: "Warranty policies that convert", fa: "سیاست‌های گارانتی اثرگذار" },
    ],
    requirements: [
      { en: "Basic repair skill or passion to learn", fa: "مهارت پایه یا انگیزه یادگیری" },
    ],
    syllabus: [
      {
        title: { en: "Lesson 1 — Numbers", fa: "درس ۱ — اعداد" },
        lessons: [
          { title: { en: "Cost per repair math", fa: "ریاضی هرینه هر تعمیر" }, duration: "40m" },
          { title: { en: "Margin tiers", fa: "لایه‌های حاشیه سود" }, duration: "35m" },
        ],
      },
      {
        title: { en: "Lesson 2 — Growth", fa: "درس ۲ — رشد" },
        lessons: [
          { title: { en: "Reviews that build trust", fa: "نظراتی که اعتماد می‌سازند" }, duration: "45m" },
          { title: { en: "Hiring your first tech", fa: "اولین استخدام تکنسین" }, duration: "50m" },
        ],
      },
    ],
    previewLength: "5:55",
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export type Enrollment = {
  courseId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextSession?: string;
};

export const mockEnrollments: Enrollment[] = [
  {
    courseId: "c1",
    progress: 62,
    completedLessons: 14,
    totalLessons: 22,
    nextSession: "2026-09-28T16:00:00",
  },
  {
    courseId: "c3",
    progress: 25,
    completedLessons: 7,
    totalLessons: 28,
    nextSession: "2026-10-02T18:30:00",
  },
];
