"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ShieldCheck, Wrench, PackageCheck, Stethoscope, ClipboardCheck } from "lucide-react";
import {
  findTicket,
  statusOrder,
  type RepairTicket,
} from "@/lib/data/repairs";
import { useI18n } from "@/components/providers";
import { Badge, EmptyState, LocaleLink } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatPrice, formatDate } from "@/lib/format";

const stepIcons = [ClipboardCheck, Stethoscope, Wrench, ShieldCheck, PackageCheck];

export function RepairTracker() {
  const { locale, dict } = useI18n();
  const params = useSearchParams();
  const initial = params.get("id") ?? "";
  const [query, setQuery] = useState(initial);
  const [ticket, setTicket] = useState<RepairTicket | null | "none">(
    initial ? (findTicket(initial) ?? "none") : null,
  );

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findTicket(query);
    setTicket(found ?? "none");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={search} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-bold">
            {dict.repair.status.title}
          </span>
          <span className="relative block">
            <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted start-3" />
            <input
              className="input ps-9 font-mono"
              placeholder={dict.repair.status.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              dir="ltr"
            />
          </span>
        </label>
        <button type="submit" className="btn btn-primary sm:w-auto">
          {dict.repair.status.track}
        </button>
      </form>

      <p className="text-sm text-muted">{dict.repair.status.subtitle}</p>

      {ticket === null ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["MH-RPR-1042", "MH-RPR-1043", "MH-RPR-1044"].map((id) => (
            <button
              key={id}
              type="button"
              className="card p-4 text-start transition hover:border-brand"
              onClick={() => {
                setQuery(id);
                setTicket(findTicket(id) ?? "none");
              }}
            >
              <span className="text-xs text-muted">Demo ID</span>
              <span className="block font-mono font-bold text-brand" dir="ltr">
                {id}
              </span>
            </button>
          ))}
        </div>
      ) : ticket === "none" ? (
        <EmptyState title={dict.repair.status.notFound} icon={<Search className="size-6" />} />
      ) : (
        <article className="card p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted">{dict.repair.status.title}</p>
              <p className="text-xl font-extrabold text-brand" dir="ltr">
                {ticket.id}
              </p>
            </div>
            <Badge tone="brand">
              {dict.repair.status.steps[
                ticket.status as keyof typeof dict.repair.status.steps
              ]}
            </Badge>
          </div>

          <ol className="mb-6 grid gap-3 sm:grid-cols-5">
            {statusOrder.map((s, i) => {
              const activeIdx = statusOrder.indexOf(ticket.status);
              const done = i <= activeIdx;
              const Icon = stepIcons[i];
              return (
                <li key={s} className="relative">
                  <div
                    className={cn(
                      "flex h-full flex-col items-center gap-2 rounded-xl border p-3 text-center",
                      done
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-border text-muted",
                    )}
                  >
                    <Icon className="size-5" />
                    <span className="text-[11px] font-bold">
                      {dict.repair.status.steps[s as keyof typeof dict.repair.status.steps]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>

          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">{dict.repair.status.device}</dt>
              <dd className="font-bold">{ticket.device}</dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">{dict.repair.status.issue}</dt>
              <dd className="font-bold">
                {dict.repair.issues[ticket.issue as keyof typeof dict.repair.issues]}
              </dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">{dict.repair.status.technician}</dt>
              <dd className="font-bold">{ticket.technician}</dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">{dict.repair.status.estimateLabel}</dt>
              <dd className="font-bold">{formatPrice(ticket.estimate, locale)}</dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">Mode</dt>
              <dd className="font-bold">
                {ticket.mode === "inStore"
                  ? dict.repair.modes.inStore
                  : dict.repair.modes.mailIn}
              </dd>
            </div>
            <div className="rounded-xl border border-border p-3">
              <dt className="text-muted">{dict.repair.status.updatedAt}</dt>
              <dd className="font-bold" dir="ltr">
                {formatDate(ticket.updatedAt, locale)} ·{" "}
                {new Date(ticket.updatedAt).toLocaleTimeString(locale === "fa" ? "fa-IR" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-3">
            <LocaleLink href="/repair" className="btn btn-secondary btn-sm">
              {dict.repair.wizard.title}
            </LocaleLink>
            <LocaleLink href="/contact" className="btn btn-ghost btn-sm">
              {dict.nav.contact}
            </LocaleLink>
          </div>
        </article>
      )}
    </div>
  );
}
