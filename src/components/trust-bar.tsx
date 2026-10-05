import {
  BadgeCheck,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionary";

const items = [
  { key: "freeShipping" as const, icon: Truck },
  { key: "onlinePay" as const, icon: ShieldCheck },
  { key: "support24" as const, icon: Headphones },
  { key: "original" as const, icon: BadgeCheck },
  { key: "freeReturns" as const, icon: RotateCcw },
];

export function TrustBar() {
  const dict = getDictionary();
  return (
    <section
      aria-label={dict.trust.freeShipping.title}
      className="border-y border-border bg-surface"
    >
      <div className="container-page grid grid-cols-2 gap-3 py-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-start gap-2.5 px-1 py-1">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight">
                {dict.trust[key].title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted">
                {dict.trust[key].text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
