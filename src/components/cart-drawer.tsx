"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart, useI18n } from "@/components/providers";
import { ProductArt, EmptyState } from "@/components/ui";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { locale, dict } = useI18n();
  const { lines, subtotal, isOpen, setOpen, setQty, remove, count } = useCart();

  if (!isOpen) return null;

  const shipping = subtotal >= 5_000_000 || subtotal === 0 ? 0 : 350_000;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
        aria-label={dict.common.close}
      />
      <aside className="absolute inset-y-0 end-0 flex w-[min(100vw,26rem)] flex-col border-s border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingCart className="size-5 text-brand" />
            {dict.shop.cart.title}
            <span className="badge bg-brand-soft text-brand">{count}</span>
          </h2>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setOpen(false)}
            aria-label={dict.common.close}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <EmptyState
              title={dict.shop.cart.empty}
              action={
                <Link
                  href="/shop"
                  className="btn btn-primary btn-sm"
                  onClick={() => setOpen(false)}
                >
                  {dict.shop.cart.emptyCta}
                </Link>
              }
              icon={<ShoppingCart className="size-6" />}
            />
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-xl border border-border p-3"
                >
                  <ProductArt
                    art={{ ...line.art, type: line.art.type }}
                    className="size-16 shrink-0"
                    rounded="rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {line.name[locale]}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-brand">
                      {formatPrice(line.price, locale)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          className="px-2 py-1 text-muted hover:text-fg"
                          onClick={() => setQty(line.id, line.qty - 1)}
                          aria-label="-"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1 text-muted hover:text-fg"
                          onClick={() => setQty(line.id, line.qty + 1)}
                          aria-label="+"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm text-rose-500"
                        onClick={() => remove(line.id)}
                        aria-label={dict.shop.cart.remove}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-3 border-t border-border p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">{dict.shop.cart.subtotal}</span>
              <span className="font-bold">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">{dict.shop.cart.shipping}</span>
              <span className="font-bold">
                {shipping === 0
                  ? dict.shop.cart.freeShipping
                  : formatPrice(shipping, locale)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-bold">{dict.shop.cart.total}</span>
              <span className="font-extrabold text-brand">
                {formatPrice(subtotal + shipping, locale)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                className="btn btn-secondary btn-sm"
                onClick={() => setOpen(false)}
              >
                {dict.cart.viewCart}
              </Link>
              <Link
                href="/checkout"
                className="btn btn-primary btn-sm"
                onClick={() => setOpen(false)}
              >
                {dict.shop.cart.checkout}
              </Link>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
