"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart, useI18n } from "@/components/providers";
import { EmptyState, LocaleLink, Price, ProductArt } from "@/components/ui";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { locale, dict } = useI18n();
  const { lines, subtotal, setQty, remove } = useCart();
  const shipping = subtotal >= 5_000_000 || subtotal === 0 ? 0 : 350_000;

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-3xl font-extrabold">{dict.shop.cart.title}</h1>

      {lines.length === 0 ? (
        <EmptyState
          title={dict.shop.cart.empty}
          icon={<ShoppingCart className="size-6" />}
          action={
            <LocaleLink href="/shop" className="btn btn-primary">
              {dict.shop.cart.emptyCta}
            </LocaleLink>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-3">
            {lines.map((line) => (
              <li
                key={line.id}
                className="card flex flex-wrap items-center gap-4 p-4"
              >
                <ProductArt
                  art={{ ...line.art, type: line.art.type }}
                  className="size-20 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={line.href}
                    className="font-bold hover:text-brand"
                  >
                    {line.name[locale]}
                  </Link>
                  <p className="mt-1 text-sm font-semibold text-brand">
                    <Price amount={line.price} size="sm" />
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      className="px-2 py-1.5"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      aria-label="-"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-bold">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      className="px-2 py-1.5"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      aria-label="+"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost text-rose-500"
                    onClick={() => remove(line.id)}
                    aria-label={dict.shop.cart.remove}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="card h-fit p-5">
            <h2 className="mb-4 font-bold">{dict.shop.checkout.orderSummary}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">{dict.shop.cart.subtotal}</dt>
                <dd className="font-semibold">
                  {formatPrice(subtotal, locale)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{dict.shop.cart.shipping}</dt>
                <dd className="font-semibold">
                  {shipping === 0
                    ? dict.shop.cart.freeShipping
                    : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <dt className="font-bold">{dict.shop.cart.total}</dt>
                <dd className="font-extrabold text-brand">
                  {formatPrice(subtotal + shipping, locale)}
                </dd>
              </div>
            </dl>
            <LocaleLink href="/checkout" className="btn btn-primary mt-4 w-full">
              {dict.shop.cart.checkout}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </LocaleLink>
            <LocaleLink href="/shop" className="btn btn-ghost mt-2 w-full">
              {dict.shop.cart.continueShopping}
            </LocaleLink>
          </aside>
        </div>
      )}
    </div>
  );
}
