import type { Metadata } from "next";
import {
  BadgeCheck,
  Compass,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { Badge, LocaleLink, SectionHeading } from "@/components/ui";
import { team, certifications } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.about.title, description: dict.about.subtitle };
}

export default async function AboutPage() {
  const locale: Locale = "fa";
  const dict = getDictionary();

  const valueIcons = [HeartHandshake, BadgeCheck, Lightbulb, Users];
  const valueKeys = ["honesty", "quality", "learning", "community"] as const;

  return (
    <div>
      <section className="gradient-hero border-b border-border">
        <div className="container-page py-14">
          <Badge tone="brand">{dict.nav.about}</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Rocket className="size-5 text-brand" />
            <h2 className="text-xl font-extrabold">{dict.about.storyTitle}</h2>
          </div>
          <p className="text-muted leading-relaxed">{dict.about.story1}</p>
          <p className="mt-3 text-muted leading-relaxed">{dict.about.story2}</p>
        </div>
        <div className="card p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Compass className="size-5 text-brand" />
            <h2 className="text-xl font-extrabold">{dict.about.missionTitle}</h2>
          </div>
          <p className="text-muted leading-relaxed">{dict.about.mission}</p>
          <h3 className="mt-6 mb-3 font-bold">{dict.about.valuesTitle}</h3>
          <ul className="space-y-3">
            {valueKeys.map((k, i) => {
              const Icon = valueIcons[i];
              const v = dict.about.values[k];
              return (
                <li key={k} className="flex gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-bold text-sm">{v.title}</span>
                    <span className="text-sm text-muted">{v.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page py-12">
          <SectionHeading title={dict.about.teamTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.id} className="card p-5 text-center">
                <span
                  className="mx-auto flex size-16 items-center justify-center rounded-2xl text-lg font-extrabold text-white"
                  style={{ background: m.accent }}
                >
                  {m.initials}
                </span>
                <h3 className="mt-3 font-bold">{m.name[locale]}</h3>
                <p className="text-sm font-semibold text-brand">
                  {m.role[locale]}
                </p>
                <p className="mt-2 text-xs text-muted">{m.bio[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading title={dict.about.certificationsTitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 rounded-2xl border border-border p-4"
            >
              <BadgeCheck className="size-6 shrink-0 text-brand" />
              <div>
                <h3 className="font-bold">{c.title[locale]}</h3>
                <p className="text-sm text-muted">{c.body[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <SectionHeading title={dict.about.whyTitle} />
        <div className="card p-6 sm:p-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {dict.about.why.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocaleLink href="/contact" className="btn btn-primary">
              {dict.nav.contact}
            </LocaleLink>
            <LocaleLink href="/shop" className="btn btn-secondary">
              {dict.nav.shop}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
