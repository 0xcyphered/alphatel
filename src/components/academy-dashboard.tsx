"use client";

import { useState } from "react";
import { Award, BookOpen, PlayCircle, CheckCircle2 } from "lucide-react";
import { courses, mockEnrollments } from "@/lib/data/courses";
import { useI18n } from "@/components/providers";
import { Badge, LocaleLink, Price } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function AcademyDashboard() {
  const { locale, dict } = useI18n();
  const [active, setActive] = useState(mockEnrollments[0].courseId);
  const [lessonIdx, setLessonIdx] = useState(0);

  const enrollments = mockEnrollments;
  const activeEnrollment =
    enrollments.find((e) => e.courseId === active) ?? enrollments[0];
  const activeCourse = courses.find((c) => c.id === activeEnrollment.courseId)!;
  const totalLessons = activeEnrollment.totalLessons;

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <aside className="card h-fit p-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-muted">
          {dict.academy.dashboard.title}
        </p>
        <p className="mb-4 font-bold">
          {dict.academy.dashboard.welcome.replace("{name}", "Sara")}
        </p>
        <nav className="space-y-1">
          {enrollments.map((e) => {
            const course = courses.find((c) => c.id === e.courseId)!;
            return (
              <button
                key={e.courseId}
                type="button"
                onClick={() => setActive(e.courseId)}
                className={cn(
                  "flex w-full items-start gap-2 rounded-xl p-3 text-start text-sm transition",
                  active === e.courseId
                    ? "bg-brand-soft text-brand"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800",
                )}
              >
                <BookOpen className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="block font-semibold">
                    {course.title[locale]}
                  </span>
                  <span className="text-xs text-muted">
                    {e.progress}%
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
        <LocaleLink
          href="/academy"
          className="btn btn-secondary mt-4 w-full btn-sm"
        >
          {dict.academy.dashboard.browseCourses}
        </LocaleLink>
      </aside>

      <div className="space-y-5">
        <section className="card p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold">
                {activeCourse.title[locale]}
              </h2>
              <p className="text-sm text-muted">
                {activeCourse.instructor.name[locale]} ·{" "}
                {dict.academy.levels[activeCourse.level]}
              </p>
            </div>
            <div className="text-end">
              <p className="text-xs text-muted">
                {dict.academy.dashboard.progress}
              </p>
              <p className="text-2xl font-extrabold text-brand">
                {activeEnrollment.progress}%
              </p>
            </div>
          </div>

          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${activeCourse.accent.from}, ${activeCourse.accent.to})`,
            }}
          >
            <div className="text-center text-white">
              <PlayCircle className="mx-auto size-16 opacity-90" />
              <p className="mt-2 text-sm font-semibold opacity-90">
                {dict.academy.dashboard.playerPlaceholder}
              </p>
              <p className="text-xs opacity-70">
                Lesson {Math.min(lessonIdx + 1, totalLessons)} / {totalLessons}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {dict.academy.dashboard.lessonsCompleted
                .replace("{done}", String(activeEnrollment.completedLessons))
                .replace("{total}", String(totalLessons))}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  setLessonIdx((i) => Math.max(0, i - 1))
                }
              >
                {dict.common.previous}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  setLessonIdx((i) => Math.min(totalLessons - 1, i + 1))
                }
              >
                {dict.academy.dashboard.watchLesson}
              </button>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${activeEnrollment.progress}%` }}
            />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <BookOpen className="size-4 text-brand" />
              {dict.academy.dashboard.myCourses}
            </h3>
            <ul className="space-y-3">
              {enrollments.map((e) => {
                const course = courses.find((c) => c.id === e.courseId)!;
                return (
                  <li
                    key={e.courseId}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <LocaleLink
                      href={`/academy/${course.slug}`}
                      className="font-semibold hover:text-brand"
                    >
                      {course.title[locale]}
                    </LocaleLink>
                    <Badge tone="brand">{e.progress}%</Badge>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <Award className="size-4 text-brand" />
              {dict.academy.dashboard.certificates}
            </h3>
            <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
              <CheckCircle2 className="mb-1 size-5 text-emerald-500" />
              {dict.academy.course.certificateYes}
            </div>
            {activeEnrollment.nextSession ? (
              <div className="mt-3 rounded-xl bg-brand-soft p-3 text-sm">
                <p className="font-semibold text-brand">
                  {dict.academy.dashboard.nextSession}
                </p>
                <p className="text-xs text-muted" dir="ltr">
                  {formatDate(activeEnrollment.nextSession, locale)}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">{dict.academy.catalog}</h3>
            <Price amount={activeCourse.price} size="sm" />
          </div>
          <ul className="space-y-2">
            {activeCourse.syllabus.map((mod) => (
              <li
                key={mod.title.en}
                className="flex items-start justify-between gap-3 rounded-lg bg-bg px-3 py-2 text-sm"
              >
                <span>{mod.title[locale]}</span>
                <span className="shrink-0 text-xs text-muted">
                  {mod.lessons.length} {dict.academy.course.lessons}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
