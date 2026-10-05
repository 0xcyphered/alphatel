"use client";

import { useMemo, useState } from "react";
import { Check, Search, Smartphone, Sparkles, Phone } from "lucide-react";
import {
  simCards,
  carriers,
  patternTagList,
  type Carrier,
  type PatternTag,
  type SimCard,
  type SimType,
} from "@/lib/data/sims";
import { useCart, useI18n, useToast } from "@/components/providers";
import { Badge, EmptyState, Price } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export function SimBrowser() {
  const { locale, dict } = useI18n();
  const { add } = useCart();
  const { push } = useToast();
  const [carrier, setCarrier] = useState<Carrier | "all">("all");
  const [type, setType] = useState<SimType | "all">("all");
  const [tier, setTier] = useState<"all" | "regular" | "vip">("all");
  const [pattern, setPattern] = useState<PatternTag | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...simCards];
    if (carrier !== "all") list = list.filter((s) => s.carrier === carrier);
    if (type !== "all") list = list.filter((s) => s.type === type);
    if (tier !== "all") list = list.filter((s) => s.tier === tier);
    if (pattern !== "all") list = list.filter((s) => s.patternTags.includes(pattern));
    if (q.trim()) {
      const query = q.trim().replace(/\s/g, "");
      list = list.filter((s) => s.number.replace(/\s/g, "").includes(query));
    }
    return list.sort((a, b) => a.price - b.price);
  }, [carrier, type, tier, pattern, q]);

  const buy = (sim: SimCard) => {
    setSelected(sim.id);
    add(
      {
        id: sim.id,
        slug: sim.id,
        name: {
          en: `SIM ${sim.number}`,
          fa: `سیم‌کارت ${sim.number}`,
        },
        price: sim.price,
        art: { type: "phone", from: "#0f766e", to: "#14b8a6" },
        href: "/sim-cards",
      },
    );
    push(dict.cart.added);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
      <aside className="card h-fit space-y-5 p-5 lg:sticky lg:top-28">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">
            {dict.sim.filters.numberPattern}
          </span>
          <span className="relative block">
            <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted start-3" />
            <input
              className="input ps-9 text-sm"
              placeholder={dict.sim.filters.searchPattern}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              dir="ltr"
            />
          </span>
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            {dict.sim.filters.carrier}
          </legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={carrier === "all"}
              onClick={() => setCarrier("all")}
              label={dict.sim.filters.all}
            />
            {carriers.map((c) => (
              <Chip
                key={c}
                active={carrier === c}
                onClick={() => setCarrier(c)}
                label={dict.sim.carriers[c]}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            {dict.sim.filters.type}
          </legend>
          <div className="flex flex-wrap gap-2">
            <Chip active={type === "all"} onClick={() => setType("all")} label={dict.sim.filters.all} />
            <Chip
              active={type === "prepaid"}
              onClick={() => setType("prepaid")}
              label={dict.sim.types.prepaid}
            />
            <Chip
              active={type === "postpaid"}
              onClick={() => setType("postpaid")}
              label={dict.sim.types.postpaid}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            {dict.sim.filters.tier}
          </legend>
          <div className="flex flex-wrap gap-2">
            <Chip active={tier === "all"} onClick={() => setTier("all")} label={dict.sim.filters.all} />
            <Chip
              active={tier === "regular"}
              onClick={() => setTier("regular")}
              label={dict.sim.filters.regular}
            />
            <Chip
              active={tier === "vip"}
              onClick={() => setTier("vip")}
              label={dict.sim.filters.vip}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            {dict.sim.popularPatterns}
          </legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={pattern === "all"}
              onClick={() => setPattern("all")}
              label={dict.sim.filters.all}
            />
            {patternTagList.map((p) => (
              <Chip
                key={p}
                active={pattern === p}
                onClick={() => setPattern(p)}
                label={dict.sim.patternMeaning[p as keyof typeof dict.sim.patternMeaning]}
              />
            ))}
          </div>
        </fieldset>

        <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted">
          <li>✓ {dict.sim.features.instantActivation}</li>
          <li>✓ {dict.sim.features.numberGuarantee}</li>
          <li>✓ {dict.sim.features.portability}</li>
        </ul>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {dict.common.results.replace("{count}", String(filtered.length))}
          </p>
          <Badge tone="success">{dict.sim.checkoutNote}</Badge>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title={dict.common.noResults} icon={<Phone className="size-6" />} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((sim) => (
              <article
                key={sim.id}
                className={cn(
                  "card flex flex-col p-5 transition hover:shadow-md",
                  sim.tier === "vip" &&
                    "border-amber-400/60 bg-gradient-to-br from-amber-50 to-surface dark:from-amber-950/40 dark:to-surface",
                  !sim.inStock && "opacity-60",
                  selected === sim.id && "ring-2 ring-brand",
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Badge tone={sim.tier === "vip" ? "accent" : "neutral"}>
                    {sim.tier === "vip" ? (
                      <Sparkles className="size-3" />
                    ) : (
                      <Smartphone className="size-3" />
                    )}
                    {sim.tier === "vip" ? dict.sim.filters.vip : dict.sim.filters.regular}
                  </Badge>
                  <Badge tone="brand">{dict.sim.carriers[sim.carrier]}</Badge>
                </div>

                <p
                  className="text-2xl font-extrabold tracking-widest text-fg"
                  dir="ltr"
                  style={{ textAlign: "start" }}
                >
                  {sim.number}
                </p>
                <p className="mt-1 text-sm font-semibold text-brand">
                  {sim.pattern[locale]}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge tone="neutral">{dict.sim.types[sim.type]}</Badge>
                  {sim.features.map((f) => (
                    <Badge key={f.en} tone="neutral">
                      {f[locale]}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                  <Price amount={sim.price} size="sm" />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={!sim.inStock}
                    onClick={() => buy(sim)}
                  >
                    {selected === sim.id ? <Check className="size-4" /> : null}
                    {sim.inStock ? dict.sim.buy : dict.common.outOfStock}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-muted">{dict.common.demoNotice}</p>
        <p className="sr-only">{formatPrice(0, locale)}</p>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-border text-muted hover:border-brand",
      )}
    >
      {label}
    </button>
  );
}
