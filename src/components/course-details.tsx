"use client";

import { useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  PlayCircle,
  Users,
  X,
} from "lucide-react";
import type { Course } from "@/lib/data/courses";
import { useI18n, useToast } from "@/components/providers";
import { Badge, LocaleLink, Price } from "@/components/ui";
import { formatDate } from "@/lib/format";

export function CourseDetails({ course }: { course: Course }) {
  const { locale, dict } = useI18n();
  const { push } = useToast();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [showForm, setShowForm] = useState(false);

  const enroll = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolled(true);
    setShowForm(false);
    push(
      dict.academy.enroll.successText.replace(
        "{course}",
        course.title[locale],
      ),
    );
  };

  return (
    <div className="container-page py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <div
            className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-8"
            style={{
              backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})`,
            }}
          >
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-white/20 text-white">
                {dict.academy.levels[course.level]}
              </span>
              <span className="badge bg-white/20 text-white">
                {dict.academy.filters[course.format]}
              </span>
              {course.certificate ? (
                <span className="badge bg-white/20 text-white">
                  <Award className="size-3" />
                  {dict.academy.course.certificate}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              {course.title[locale]}
            </h1>
            <p className="mt-2 max-w-2xl text-white/90">
              {course.subtitle[locale]}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Users className="size-4" />
                {course.students} {dict.academy.course.students}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {course.durationWeeks}w · {course.sessions}{" "}
                {dict.academy.course.sessions}
              </span>
              <span className="font-bold">★ {course.rating}</span>
            </div>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold backdrop-blur transition hover:bg-white/25"
            >
              <PlayCircle className="size-5" />
              {dict.academy.course.preview} · {course.previewLength}
            </button>
          </div>

          <section className="mt-8">
            <h2 className="mb-3 text-xl font-extrabold">
              {dict.academy.course.outcomes}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li
                  key={o.en}
                  className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {o[locale]}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="mb-3 text-xl font-extrabold">
              {dict.academy.course.syllabus}
            </h2>
            <div className="space-y-3">
              {course.syllabus.map((mod) => (
                <div key={mod.title.en} className="card p-4">
                  <h3 className="flex items-center gap-2 font-bold">
                    <BookOpen className="size-4 text-brand" />
                    {mod.title[locale]}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {mod.lessons.map((lesson) => (
                      <li
                        key={lesson.title.en}
                        className="flex items-center justify-between gap-3 rounded-lg bg-bg px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <PlayCircle className="size-4 text-muted" />
                          {lesson.title[locale]}
                        </span>
                        <span className="text-xs text-muted" dir="ltr">
                          {lesson.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <h3 className="mb-3 font-bold">
                {dict.academy.course.requirements}
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                {course.requirements.map((r) => (
                  <li key={r.en}>• {r[locale]}</li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-bold">
                {dict.academy.course.aboutInstructor}
              </h3>
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                  {course.instructor.initials}
                </span>
                <div>
                  <p className="font-bold">{course.instructor.name[locale]}</p>
                  <p className="text-sm text-brand">
                    {course.instructor.title[locale]}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {course.instructor.bio[locale]}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="card h-fit p-5 lg:sticky lg:top-28">
          <Price
            amount={course.price}
            oldAmount={course.oldPrice}
            size="lg"
          />
          <p className="mt-1 text-xs text-muted">
            <Calendar className="me-1 inline size-3.5" />
            {course.durationWeeks}w · {course.sessions}{" "}
            {dict.academy.course.sessions}
          </p>

          {enrolled ? (
            <div className="mt-4 space-y-2">
              <Badge tone="success" className="w-full justify-center py-2">
                <CheckCircle2 className="size-4" />
                {dict.academy.course.enrolled}
              </Badge>
              <LocaleLink
                href="/academy/dashboard"
                className="btn btn-primary w-full"
              >
                {dict.academy.enroll.goDashboard}
              </LocaleLink>
            </div>
          ) : showForm ? (
            <form onSubmit={enroll} className="mt-4 space-y-3">
              <p className="text-sm font-bold">{dict.academy.enroll.title}</p>
              <input
                required
                className="input text-sm"
                placeholder={dict.academy.enroll.fullName}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                className="input text-sm"
                placeholder={dict.academy.enroll.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                required
                className="input text-sm"
                placeholder={dict.academy.enroll.phone}
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button type="submit" className="btn btn-primary w-full">
                {dict.academy.course.enroll}
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full"
                onClick={() => setShowForm(false)}
              >
                {dict.common.cancel}
              </button>
              <p className="text-[11px] text-muted">{dict.common.demoNotice}</p>
            </form>
          ) : (
            <button
              type="button"
              className="btn btn-primary mt-4 w-full"
              onClick={() => setShowForm(true)}
            >
              {dict.academy.course.enroll}
            </button>
          )}

          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-muted">
            <li>✓ {dict.academy.course.certificateYes}</li>
            <li>✓ {dict.academy.filters[course.format]}</li>
            <li>✓ {dict.whyUs.support.text}</li>
          </ul>

          <div className="mt-4 flex items-center gap-1 text-xs text-muted">
            <Calendar className="size-3.5" />
            {formatDate("2026-10-01", locale)}
          </div>
        </aside>
      </div>

      {previewOpen ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setPreviewOpen(false)}
            aria-label={dict.common.close}
          />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">{dict.academy.course.previewTitle}</h3>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setPreviewOpen(false)}
                aria-label={dict.common.close}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white">
              <button
                type="button"
                className="flex flex-col items-center gap-2"
                onClick={() => setPreviewOpen(false)}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <PlayCircle className="size-10" />
                </span>
                <span className="text-sm text-slate-300">
                  {dict.academy.dashboard.playerPlaceholder} · {course.previewLength}
                </span>
              </button>
            </div>
            <p className="mt-3 text-sm text-muted">{course.subtitle[locale]}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
