import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import { AppProviders } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { TrustBar } from "@/components/trust-bar";
import { getDictionary } from "@/i18n/dictionary";
import { defaultLocale, dirMap, type Locale } from "@/i18n/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const locale: Locale = defaultLocale;

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return {
    title: {
      default: dict.meta.title,
      template: `%s | AlphaTel`,
    },
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dir = dirMap[locale];
  const dict = getDictionary();

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders i18n={{ locale, dir, dict }}>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <TrustBar />
            <Footer />
            <CartDrawer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
