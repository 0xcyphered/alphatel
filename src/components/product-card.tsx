"use client";

import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { L, brandLabels } from "@/lib/data/products";
import { useCart, useI18n, useToast } from "@/components/providers";
import { Badge, LocaleLink, Price, ProductArt, Rating } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { locale, dict } = useI18n();
  const { add, lastAdded } = useCart();
  const { push } = useToast();
  const added = lastAdded === product.id;

  const badgeTone =
    product.badge === "sale" ? "accent" : product.badge === "new" ? "brand" : "neutral";

  const addToCart = () => {
    if (!product.inStock) return;
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      art: product.art,
      href: `/shop/${product.slug}`,
    });
    push(dict.cart.added);
  };

  return (
    <article className="group card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <LocaleLink
        href={`/shop/${product.slug}`}
        className="relative block"
        aria-label={product.name[locale]}
      >
        <ProductArt
          art={{ ...product.art, type: product.art.type }}
          className="aspect-[4/5] w-full rounded-none"
        />
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {product.badge ? (
            <Badge tone={badgeTone as "brand" | "accent" | "neutral"}>
              {product.badge === "new"
                ? dict.common.new
                : product.badge === "hot"
                  ? dict.common.hot
                  : dict.common.sale}
            </Badge>
          ) : null}
          {!product.inStock ? (
            <Badge tone="danger">{dict.common.outOfStock}</Badge>
          ) : null}
        </div>
      </LocaleLink>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {brandLabels[product.brand][locale]}
          </span>
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <LocaleLink
          href={`/shop/${product.slug}`}
          className="font-bold leading-snug hover:text-brand"
        >
          {product.name[locale]}
        </LocaleLink>
        <p className="line-clamp-2 text-sm text-muted">
          {product.tagline[locale]}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Price
            amount={product.price}
            oldAmount={product.oldPrice}
            size="sm"
          />
          <button
            type="button"
            className={cn("btn btn-primary btn-sm", added && "bg-emerald-600")}
            onClick={addToCart}
            disabled={!product.inStock}
            aria-label={dict.common.addToCart}
          >
            {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
            {product.inStock ? (added ? dict.common.addToCart : null) : null}
          </button>
        </div>
        {product.inStock && product.stockCount <= 6 ? (
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {dict.common.onlyLeft.replace("{count}", String(product.stockCount))}
          </p>
        ) : null}
      </div>
      <span className="sr-only">{L(product.name, locale)}</span>
    </article>
  );
}
