"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Mailbox,
  Store,
  Wrench,
} from "lucide-react";
import {
  estimateRepair,
  repairDevices,
  repairIssues,
  type RepairIssue,
} from "@/lib/data/repairs";
import { useI18n, useToast } from "@/components/providers";
import { Badge, Price } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

const STEPS = ["device", "issue", "estimate", "book"] as const;

export function RepairWizard() {
  const { locale, dict } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [issue, setIssue] = useState<RepairIssue | null>(null);
  const [mode, setMode] = useState<"inStore" | "mailIn">("inStore");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("16:00");
  const [details, setDetails] = useState({ name: "", phone: "" });
  const [ticketId, setTicketId] = useState<string | null>(null);

  const device = useMemo(
    () => repairDevices.find((d) => d.id === deviceId) ?? null,
    [deviceId],
  );
  const estimate =
    device && issue ? estimateRepair(issue, device.tier) : null;

  const step = STEPS[stepIdx];
  const stepLabels = [
    dict.repair.wizard.stepDevice,
    dict.repair.wizard.stepIssue,
    dict.repair.wizard.stepEstimate,
    dict.repair.wizard.stepBook,
  ];

  const groups = useMemo(() => {
    const map = new Map<string, typeof repairDevices>();
    repairDevices.forEach((d) => {
      const list = map.get(d.brand) ?? [];
      list.push(d);
      map.set(d.brand, list);
    });
    return Array.from(map.entries());
  }, []);

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MH-RPR-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setTicketId(id);
    push(dict.repair.wizard.successTitle);
  };

  if (ticketId) {
    return (
      <div className="card flex flex-col items-center gap-4 p-8 text-center">
        <CheckCircle2 className="size-14 text-emerald-500" />
        <h2 className="text-xl font-extrabold">
          {dict.repair.wizard.successTitle}
        </h2>
        <p className="max-w-md text-muted">
          {dict.repair.wizard.successText.replace("{id}", ticketId)}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => router.push(`/repair/track?id=${ticketId}`)}
          >
            {dict.repair.wizard.trackNow}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setTicketId(null);
              setStepIdx(0);
              setDeviceId(null);
              setIssue(null);
            }}
          >
            {dict.repair.wizard.title}
          </button>
        </div>
        <p className="text-xs text-muted">{dict.common.demoNotice}</p>
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <Wrench className="size-5 text-brand" />
          {dict.repair.wizard.title}
        </h2>
        <Badge tone="brand">
          {dict.common.steps
            .replace("{current}", String(stepIdx + 1))
            .replace("{total}", String(STEPS.length))}
        </Badge>
      </div>

      <ol className="mb-6 grid grid-cols-4 gap-2">
        {stepLabels.map((label, i) => (
          <li key={label}>
            <div
              className={cn(
                "h-1.5 rounded-full",
                i <= stepIdx ? "bg-brand" : "bg-border",
              )}
            />
            <span
              className={cn(
                "mt-1 block truncate text-[11px] font-semibold",
                i <= stepIdx ? "text-brand" : "text-muted",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      {step === "device" ? (
        <div className="space-y-4">
          <p className="text-sm font-bold">{dict.repair.wizard.selectModel}</p>
          <div className="space-y-4">
            {groups.map(([brand, devices]) => (
              <div key={brand}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                  {devices[0].brandLabel[locale]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {devices.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDeviceId(d.id)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-semibold transition",
                        deviceId === d.id
                          ? "border-brand bg-brand-soft text-brand"
                          : "border-border text-muted hover:border-brand hover:text-fg",
                      )}
                    >
                      {d.model}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!deviceId}
            onClick={() => setStepIdx(1)}
          >
            {dict.common.next}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </button>
        </div>
      ) : null}

      {step === "issue" ? (
        <div className="space-y-4">
          <p className="text-sm font-bold">{dict.repair.wizard.selectIssue}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {repairIssues.map((iss) => (
              <button
                key={iss}
                type="button"
                onClick={() => setIssue(iss)}
                className={cn(
                  "rounded-xl border p-4 text-start transition",
                  issue === iss
                    ? "border-brand bg-brand-soft"
                    : "border-border hover:border-brand",
                )}
              >
                <span className="block font-bold">
                  {dict.repair.issues[iss as keyof typeof dict.repair.issues]}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {dict.repair.issueHints[iss as keyof typeof dict.repair.issueHints]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStepIdx(0)}
            >
              {dict.common.back}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!issue}
              onClick={() => setStepIdx(2)}
            >
              {dict.common.next}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      ) : null}

      {step === "estimate" && estimate && device && issue ? (
        <div className="space-y-5">
          <div className="grid gap-3 rounded-2xl border border-brand/40 bg-brand-soft/50 p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted">{dict.repair.wizard.stepDevice}</p>
              <p className="font-bold">{device.model}</p>
            </div>
            <div>
              <p className="text-xs text-muted">{dict.repair.wizard.stepIssue}</p>
              <p className="font-bold">
                {dict.repair.issues[issue as keyof typeof dict.repair.issues]}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">
                {dict.repair.wizard.estimatedCost}
              </p>
              <p className="text-lg font-extrabold text-brand">
                {formatPrice(estimate.min, locale)} – {formatPrice(estimate.max, locale)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted">
              <Calendar className="size-4 text-brand" />
              {dict.repair.wizard.turnaround}:
              <strong className="text-fg">
                {estimate.hours <= 24
                  ? `${estimate.hours}h`
                  : `${Math.round(estimate.hours / 24)}d`}
              </strong>
            </span>
            <Badge tone="success">{dict.repair.warranty}</Badge>
            <Badge tone="neutral">{dict.repair.parts}</Badge>
          </div>

          <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            ⚠ {dict.repair.wizard.disclaimer}
          </p>

          <div className="flex flex-wrap gap-2">
            <fieldset className="flex-1">
              <legend className="mb-2 text-sm font-bold">
                {dict.repair.wizard.serviceMode}
              </legend>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode("inStore")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold",
                    mode === "inStore"
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border",
                  )}
                >
                  <Store className="size-4" />
                  {dict.repair.modes.inStore}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("mailIn")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold",
                    mode === "mailIn"
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border",
                  )}
                >
                  <Mailbox className="size-4" />
                  {dict.repair.modes.mailIn}
                </button>
              </div>
            </fieldset>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStepIdx(1)}
            >
              {dict.common.back}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStepIdx(3)}
            >
              {dict.common.continue}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      ) : null}

      {step === "book" ? (
        <form onSubmit={confirm} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-muted">
                {dict.repair.wizard.selectDate}
              </span>
              <input
                type="date"
                required
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted">
                {dict.repair.wizard.selectTime}
              </span>
              <select
                className="input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted">
                {dict.repair.wizard.yourDetails} — {dict.common.name}
              </span>
              <input
                required
                className="input"
                value={details.name}
                onChange={(e) =>
                  setDetails((d) => ({ ...d, name: e.target.value }))
                }
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted">{dict.common.phone}</span>
              <input
                required
                className="input"
                dir="ltr"
                value={details.phone}
                onChange={(e) =>
                  setDetails((d) => ({ ...d, phone: e.target.value }))
                }
              />
            </label>
          </div>

          <div className="rounded-xl border border-border bg-bg p-4 text-sm">
            <p className="text-muted">
              {device?.model} ·{" "}
              {issue ? dict.repair.issues[issue] : ""} ·{" "}
              {mode === "inStore"
                ? dict.repair.modes.inStore
                : dict.repair.modes.mailIn}
            </p>
            {estimate ? (
              <p className="mt-1 font-bold text-brand">
                <Price amount={estimate.typical} size="sm" />
              </p>
            ) : null}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStepIdx(2)}
            >
              {dict.common.back}
            </button>
            <button type="submit" className="btn btn-primary flex-1">
              {mode === "inStore"
                ? dict.repair.wizard.bookAppointment
                : dict.repair.wizard.requestMailIn}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
