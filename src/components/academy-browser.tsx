"use client";

import { useMemo, useState } from "react";
import { Clock, Users, Award, PlayCircle, Star } from "lucide-react";
import { courses, type CourseFormat, type CourseLevel } from "@/lib/data/courses";
import { useI18n } from "@/components/providers";
import { Badge, LocaleLink, Price } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AcademyBrowser() {
  const { locale, dict } = useI18n();
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [format, setFormat] = useState<CourseFormat | "all">("all");

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (level === "all" || c.level === level) &&
          (format === "all" || c.format === format),
      ),
    [level, format],
  );

  const chip = (
    active: boolean,
    onClick: () => void,
    label: string,
    key: string,
  ) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-border text-muted hover:border-brand hover:text-fg",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center gap-6 p-5">
        <div>
          <p className="mb-2 text-sm font-bold">{dict.academy.filters.level}</p>
          <div className="flex flex-wrap gap-2">
            {chip(level === "all", () => setLevel("all"), dict.academy.filters.all, "la")}
            {(["beginner", "intermediate", "advanced"] as CourseLevel[]).map((l) =>
              chip(
                level === l,
                () => setLevel(l),
                dict.academy.levels[l],
                l,
              ),
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold">{dict.academy.filters.format}</p>
          <div className="flex flex-wrap gap-2">
            {chip(format === "all", () => setFormat("all"), dict.academy.filters.all, "fa")}
            {(["online", "inPerson", "hybrid"] as CourseFormat[]).map((f) =>
              chip(
                format === f,
                () => setFormat(f),
                dict.academy.filters[f],
                f,
              ),
            )}
          </div>
        </div>
        <p className="ms-auto text-sm text-muted">
          {dict.common.results.replace("{count}", String(filtered.length))}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <article
            key={course.id}
            className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className="relative flex h-40 items-end p-4 text-white"
              style={{
                backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})`,
              }}
            >
              <div className="absolute top-3 end-3 flex gap-1.5">
                <span className="badge bg-white/20 text-white">
                  {dict.academy.levels[course.level]}
                </span>
                {course.badge ? (
                  <span className="badge bg-black/40 text-white">
                    {course.badge === "new" ? dict.common.new : dict.common.hot}
                  </span>
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-extrabold leading-tight">
                  {course.title[locale]}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/85">
                  <PlayCircle className="size-3.5" />
                  {dict.academy.course.preview} · {course.previewLength}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="line-clamp-2 text-sm text-muted">
                {course.subtitle[locale]}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <Badge tone="neutral">
                  <Clock className="size-3" />
                  {course.durationWeeks}w · {course.sessions}{" "}
                  {dict.academy.course.sessions}
                </Badge>
                <Badge tone="neutral">
                  <Users className="size-3" />
                  {course.students} {dict.academy.course.students}
                </Badge>
                {course.certificate ? (
                  <Badge tone="neutral">
                    <Award className="size-3" />
                    {dict.academy.course.certificate}
                  </Badge>
                ) : null}
                <Badge tone="brand">{dict.academy.filters[course.format]}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="flex size-7 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  {course.instructor.initials}
                </span>
                <span className="font-semibold">
                  {course.instructor.name[locale]}
                </span>
                <span className="ms-auto flex items-center gap-0.5 text-amber-500">
                  <Star className="size-3.5 fill-current" />
                  {course.rating}
                </span>
              </div>

              <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-3">
                <Price
                  amount={course.price}
                  oldAmount={course.oldPrice}
                  size="md"
                />
                <LocaleLink
                  href={`/academy/${course.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  {dict.common.viewDetails}
                </LocaleLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
