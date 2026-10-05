"use client";

import { BookOpen, GraduationCap, Package, Wrench } from "lucide-react";
import { useI18n } from "@/components/providers";
import { Badge, LocaleLink } from "@/components/ui";
import { mockEnrollments, courses } from "@/lib/data/courses";

const mockOrders = [
  { id: "MH-ORD-4821", items: 2, total: 91_900_000, status: "shipped" },
  { id: "MH-ORD-4790", items: 1, total: 9_800_000, status: "delivered" },
];

const mockRepairs = [
  { id: "MH-RPR-1042", device: "iPhone 14 Pro", status: "repairing" },
  { id: "MH-RPR-1039", device: "iPhone 13", status: "ready" },
];

export default function AccountPage() {
  const { locale, dict } = useI18n();

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{dict.auth.accountTitle}</h1>
          <p className="text-muted">demo@alphatel.example</p>
        </div>
        <Badge tone="success">{dict.auth.login}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <Package className="mb-2 size-5 text-brand" />
          <p className="text-sm text-muted">{dict.auth.orders}</p>
          <p className="text-2xl font-extrabold">{mockOrders.length}</p>
        </div>
        <div className="card p-5">
          <Wrench className="mb-2 size-5 text-brand" />
          <p className="text-sm text-muted">{dict.auth.repairs}</p>
          <p className="text-2xl font-extrabold">{mockRepairs.length}</p>
        </div>
        <div className="card p-5">
          <GraduationCap className="mb-2 size-5 text-brand" />
          <p className="text-sm text-muted">{dict.auth.courses}</p>
          <p className="text-2xl font-extrabold">{mockEnrollments.length}</p>
        </div>
        <div className="card p-5">
          <BookOpen className="mb-2 size-5 text-brand" />
          <p className="text-sm text-muted">{dict.academy.dashboard.progress}</p>
          <p className="text-2xl font-extrabold">
            {Math.round(
              mockEnrollments.reduce((s, e) => s + e.progress, 0) /
                mockEnrollments.length,
            )}
            %
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-4 font-bold">{dict.auth.orders}</h2>
          <ul className="space-y-3">
            {mockOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
              >
                <span className="font-mono font-bold text-brand" dir="ltr">
                  {o.id}
                </span>
                <span className="text-muted">
                  {o.items} × {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(o.total)}{" "}
                  {dict.common.currency}
                </span>
                <Badge tone={o.status === "delivered" ? "success" : "brand"}>
                  {o.status}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="mb-4 font-bold">{dict.auth.repairs}</h2>
          <ul className="space-y-3">
            {mockRepairs.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
              >
                <span>
                  <span className="block font-mono font-bold text-brand" dir="ltr">
                    {r.id}
                  </span>
                  <span className="text-xs text-muted">{r.device}</span>
                </span>
                <LocaleLink
                  href={`/repair/track?id=${r.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  {dict.nav.trackRepair}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">{dict.auth.courses}</h2>
            <LocaleLink href="/academy/dashboard" className="btn btn-secondary btn-sm">
              {dict.nav.dashboard}
            </LocaleLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mockEnrollments.map((e) => {
              const course = courses.find((c) => c.id === e.courseId)!;
              return (
                <li
                  key={e.courseId}
                  className="rounded-xl border border-border p-4"
                >
                  <LocaleLink
                    href={`/academy/${course.slug}`}
                    className="font-bold hover:text-brand"
                  >
                    {course.title[locale]}
                  </LocaleLink>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-brand"
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {e.progress}% ·{" "}
                    {dict.academy.dashboard.lessonsCompleted
                      .replace("{done}", String(e.completedLessons))
                      .replace("{total}", String(e.totalLessons))}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
