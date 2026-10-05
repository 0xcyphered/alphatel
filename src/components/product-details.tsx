"use client";

import { useState } from "react";
import { Check, ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getProductReviews, L, brandLabels, categoryLabels } from "@/lib/data/products";
import { useCart, useI18n, useToast } from "@/components/providers";
import { Badge, LocaleLink, Price, ProductArt, Rating } from "@/components/ui";
import { ProductCard } from "@/components/product-card";
import { formatDate } from "@/lib/format";

export function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  const { locale, dict } = useI18n();
  const { add, lastAdded } = useCart();
  const { push } = useToast();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);
  const [tab, setTab] = useState<"specs" | "reviews">("specs");
  const productReviews = getProductReviews(product.id);
  const added = lastAdded === product.id;

  const addToCart = () => {
    add(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        art: product.art,
        href: `/shop/${product.slug}`,
      },
      qty,
    );
    push(dict.cart.added);
  };

  const isPhone = product.category === "smartphones";
  const allSpecRows: [string, string][] = [
    [dict.shop.filters.screen, L(product.specs.screen, locale)],
    [isPhone ? "CPU" : dict.shop.filters.specs, L(product.specs.chip, locale)],
    [dict.shop.filters.battery, L(product.specs.battery, locale)],
    ...(isPhone ? ([[dict.shop.filters.camera, L(product.specs.camera, locale)]] as [string, string][]) : []),
    [dict.shop.filters.storage, product.specs.storage],
    ...(isPhone ? ([["OS", L(product.specs.os, locale)]] as [string, string][]) : []),
    [dict.shop.filters.specs, L(product.specs.weight, locale)],
    [dict.shop.product.guarantee, L(product.specs.warranty, locale)],
  ];
  const specRows = allSpecRows.filter(([, v]) => v && v !== "—");

  return (
    <div className="container-page py-8">
      <LocaleLink
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-brand"
      >
        <ChevronLeft className="size-4 rtl:rotate-180" />
        {dict.nav.shop}
      </LocaleLink>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductArt
          art={{ ...product.art, type: product.art.type }}
          label={brandLabels[product.brand][locale]}
          className="aspect-square w-full rounded-3xl"
          rounded="rounded-3xl"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{brandLabels[product.brand][locale]}</Badge>
            <Badge tone="brand">{categoryLabels[product.category][locale]}</Badge>
            {product.badge ? (
              <Badge tone={product.badge === "sale" ? "accent" : "brand"}>
                {product.badge === "new"
                  ? dict.common.new
                  : product.badge === "hot"
                    ? dict.common.hot
                    : dict.common.sale}
              </Badge>
            ) : null}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            {product.name[locale]}
          </h1>
          <p className="text-muted">{product.tagline[locale]}</p>
          <Rating value={product.rating} count={product.reviewCount} />

          <div className="rounded-2xl border border-border bg-surface p-4">
            <Price
              amount={product.price}
              oldAmount={product.oldPrice}
              size="lg"
            />
            {product.oldPrice ? (
              <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                -
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )}
                % {dict.common.off}
              </p>
            ) : null}

            <div className="mt-4">
              <p className="mb-2 text-sm font-bold">
                {dict.shop.product.selectColor}
              </p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c + i}
                    type="button"
                    onClick={() => setColor(i)}
                    aria-label={`${dict.shop.product.color} ${i + 1}`}
                    className={`size-8 rounded-full border-2 transition ${
                      color === i
                        ? "border-brand scale-110"
                        : "border-border"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-border">
                <button
                  type="button"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="-"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-8 text-center text-sm font-bold">{qty}</span>
                <button
                  type="button"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="+"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={addToCart}
                disabled={!product.inStock}
              >
                {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
                {product.inStock ? dict.common.addToCart : dict.common.outOfStock}
              </button>
            </div>

            {!product.inStock ? (
              <p className="mt-3 text-sm font-semibold text-rose-500">
                {dict.common.outOfStock}
              </p>
            ) : product.stockCount <= 6 ? (
              <p className="mt-3 text-sm font-semibold text-amber-600">
                {dict.common.onlyLeft.replace(
                  "{count}",
                  String(product.stockCount),
                )}
              </p>
            ) : null}
          </div>

          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-3">
            <li className="rounded-xl border border-border p-3">
              ✓ {dict.shop.product.guarantee}
            </li>
            <li className="rounded-xl border border-border p-3">
              🚚 {dict.shop.product.freeShipping}
            </li>
            <li className="rounded-xl border border-border p-3">
              ↩ {dict.shop.product.returnPolicy}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-2 border-b border-border">
          {(["specs", "reviews"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                tab === t
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {t === "specs"
                ? dict.shop.product.specifications
                : `${dict.shop.product.reviews} (${productReviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "specs" ? (
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {specRows.map(([k, v]) => (
                <div
                  key={k + v}
                  className="flex items-center justify-between gap-3 bg-surface px-4 py-3 text-sm"
                >
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-end">{v}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-muted">{dict.common.noResults}</p>
              ) : (
                productReviews.map((r) => (
                  <article key={r.id} className="card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{r.author}</span>
                      <span className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{r.comment[locale]}</p>
                    <p className="mt-2 text-xs text-muted">
                      {formatDate(r.date, locale)}
                    </p>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {related.length ? (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold">
            {dict.shop.product.related}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
