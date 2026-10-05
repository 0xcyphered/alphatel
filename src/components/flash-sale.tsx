"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getDictionary } from "@/i18n/dictionary";
import { LocaleLink, Badge, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/product-card";

function endOfTonight(): number {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

function splitRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function FlashSale({ products }: { products: Product[] }) {
  const dict = getDictionary();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (products.length === 0) return null;

  const t =
    now === null
      ? { hours: 0, minutes: 0, seconds: 0 }
      : splitRemaining(endOfTonight() - now);

  return (
    <section className="border-y border-border bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 text-white">
      <div className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge tone="accent" className="mb-3 bg-white/15 text-white">
              <Flame className="me-1 inline size-3" />
              {dict.common.sale}
            </Badge>
            <SectionHeading
              title={dict.sections.flashSale}
              subtitle={dict.sections.flashSaleSub}
              className="mb-0 [&_h2]:text-white [&_p]:text-slate-300"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {dict.flashSale.endsIn}
            </p>
            <div className="flex gap-2" role="timer" aria-live="polite">
              {[
                { v: pad(t.hours), l: dict.flashSale.hours },
                { v: pad(t.minutes), l: dict.flashSale.minutes },
                { v: pad(t.seconds), l: dict.flashSale.seconds },
              ].map((u) => (
                <div
                  key={u.l}
                  className="min-w-16 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur"
                >
                  <div className="text-2xl font-extrabold tabular-nums">
                    {u.v}
                  </div>
                  <div className="text-[11px] text-slate-300">{u.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">{dict.flashSale.note}</p>
          <LocaleLink href="/shop" className="btn btn-accent">
            {dict.flashSale.shopSale}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
