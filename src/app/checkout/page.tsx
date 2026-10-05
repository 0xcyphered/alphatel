"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, CreditCard, Banknote } from "lucide-react";
import { useCart, useI18n } from "@/components/providers";
import { EmptyState, LocaleLink } from "@/components/ui";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { locale, dict } = useI18n();
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState<"online" | "cod">("online");
  const [placedId, setPlacedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postal: "",
    notes: "",
  });

  const shipping = subtotal >= 5_000_000 || subtotal === 0 ? 0 : 350_000;
  const total = subtotal + shipping;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    const id = `MH-ORD-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setPlacedId(id);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placedId) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-20 text-center">
        <CheckCircle2 className="size-16 text-emerald-500" />
        <h1 className="text-2xl font-extrabold">
          {dict.shop.checkout.successTitle}
        </h1>
        <p className="max-w-md text-muted">
          {dict.shop.checkout.successText.replace("{id}", placedId)}
        </p>
        <div className="flex gap-3">
          <LocaleLink href="/" className="btn btn-primary">
            {dict.shop.checkout.continueHome}
          </LocaleLink>
          <LocaleLink href="/shop" className="btn btn-secondary">
            {dict.shop.cart.continueShopping}
          </LocaleLink>
        </div>
        <p className="text-xs text-muted">{dict.common.demoNotice}</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={dict.shop.cart.empty}
          action={
            <LocaleLink href="/shop" className="btn btn-primary">
              {dict.shop.cart.emptyCta}
            </LocaleLink>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-3xl font-extrabold">{dict.shop.checkout.title}</h1>
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="card p-5">
            <h2 className="mb-4 font-bold">{dict.shop.checkout.contact}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-muted">{dict.common.name}</span>
                <input required className="input" value={form.name} onChange={set("name")} />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">{dict.common.email}</span>
                <input required type="email" className="input" value={form.email} onChange={set("email")} />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">{dict.common.phone}</span>
                <input required className="input" value={form.phone} onChange={set("phone")} dir="ltr" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">{dict.shop.checkout.city}</span>
                <input required className="input" value={form.city} onChange={set("city")} />
              </label>
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 font-bold">{dict.shop.checkout.shippingAddr}</h2>
            <div className="grid gap-3">
              <label className="text-sm">
                <span className="mb-1 block text-muted">{dict.shop.checkout.address}</span>
                <textarea
                  required
                  rows={3}
                  className="input"
                  value={form.address}
                  onChange={set("address")}
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block text-muted">{dict.shop.checkout.postalCode}</span>
                  <input className="input" value={form.postal} onChange={set("postal")} dir="ltr" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">
                    {dict.shop.checkout.notes}
                  </span>
                  <input className="input" value={form.notes} onChange={set("notes")} />
                </label>
              </div>
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 font-bold">{dict.shop.checkout.payment}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPayment("online")}
                className={`flex items-start gap-3 rounded-xl border p-4 text-start transition ${
                  payment === "online"
                    ? "border-brand bg-brand-soft"
                    : "border-border"
                }`}
              >
                <CreditCard className="mt-0.5 size-5 text-brand" />
                <span>
                  <span className="block font-bold text-sm">
                    {dict.shop.checkout.payOnline}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPayment("cod")}
                className={`flex items-start gap-3 rounded-xl border p-4 text-start transition ${
                  payment === "cod" ? "border-brand bg-brand-soft" : "border-border"
                }`}
              >
                <Banknote className="mt-0.5 size-5 text-brand" />
                <span className="font-bold text-sm">
                  {dict.shop.checkout.payCod}
                </span>
              </button>
            </div>
          </section>
        </div>

        <aside className="card h-fit p-5">
          <h2 className="mb-4 font-bold">{dict.shop.checkout.orderSummary}</h2>
          <ul className="mb-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-2">
                <span className="truncate text-muted">
                  {l.name[locale]} × {l.qty}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(l.price * l.qty, locale)}
                </span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-border pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">{dict.shop.cart.subtotal}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{dict.shop.cart.shipping}</span>
              <span>
                {shipping === 0
                  ? dict.shop.cart.freeShipping
                  : formatPrice(shipping, locale)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-extrabold">
              <span>{dict.shop.cart.total}</span>
              <span className="text-brand">{formatPrice(total, locale)}</span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-full">
            {dict.shop.checkout.placeOrder}
          </button>
          <button
            type="button"
            className="btn btn-ghost mt-2 w-full"
            onClick={() => router.back()}
          >
            {dict.common.back}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted">
            {dict.common.demoNotice}
          </p>
        </aside>
      </form>
    </div>
  );
}
