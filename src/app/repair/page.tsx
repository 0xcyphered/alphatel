import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { RepairWizard } from "@/components/repair-wizard";
import { RepairTracker } from "@/components/repair-tracker";
import { brandLabels } from "@/lib/data/products";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.repair.title, description: dict.repair.subtitle };
}

export default async function RepairPage() {
  const locale: Locale = "fa";
  const dict = getDictionary();

  return (
    <div className="container-page py-8">
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {dict.repair.title}
          </h1>
          <p className="mt-2 text-muted">{dict.repair.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge bg-brand-soft text-brand">
              ✓ {dict.repair.warranty}
            </span>
            <span className="badge bg-brand-soft text-brand">
              ✓ {dict.repair.parts}
            </span>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              {dict.repair.brandsWeFix}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(brandLabels).map((b) => (
                <span
                  key={b.en}
                  className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted"
                >
                  {b[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-violet-600 p-8 text-white lg:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
              AlphaTel Care
            </p>
            <p className="mt-2 text-3xl font-extrabold leading-snug">
              45′ screen · 60′ battery · 90d warranty
            </p>
            <p className="mt-3 opacity-85">
              {dict.repair.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RepairWizard />
        <section>
          <h2 className="mb-4 text-lg font-extrabold">
            {dict.repair.status.title}
          </h2>
          <Suspense fallback={<div className="card h-40 shimmer" />}>
            <RepairTracker />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
