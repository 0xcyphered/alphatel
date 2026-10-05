import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { ShopBrowser } from "@/components/shop-browser";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.shop.title, description: dict.shop.subtitle };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; brand?: string; category?: string }>;
}) {
  const dict = getDictionary();
  const sp = await searchParams;

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{dict.shop.title}</h1>
        <p className="mt-1 text-muted">{dict.shop.subtitle}</p>
      </div>
      <ShopBrowser
        initialQuery={sp.q}
        initialBrand={sp.brand}
        initialCategory={sp.category}
      />
    </div>
  );
}
