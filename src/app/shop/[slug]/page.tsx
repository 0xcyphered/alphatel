import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, relatedProducts } from "@/lib/data/products";
import { ProductDetails } from "@/components/product-details";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale: Locale = "fa";
  const product = getProduct(slug);
  if (!product) return { title: "404" };
  return {
    title: product.name[locale],
    description: product.tagline[locale],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetails product={product} related={relatedProducts(product)} />;
}
