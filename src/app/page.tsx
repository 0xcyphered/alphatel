import Link from "next/link";
import {
  ArrowRight,
  Clock,
  GraduationCap,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Wrench,
  Headphones,
  MessageCircle,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { LocaleLink, SectionHeading, Badge, Rating, Price } from "@/components/ui";
import { ProductCard } from "@/components/product-card";
import { FlashSale } from "@/components/flash-sale";
import { products, brandLabels, categoryLabels, type ProductCategory } from "@/lib/data/products";
import { promos, testimonials, stats, whyUsIcons } from "@/lib/data/home-helpers";
import { courses } from "@/lib/data/courses";
import { formatCount } from "@/lib/format";

export default async function HomePage() {
  const locale: Locale = "fa";
  const dict = getDictionary();

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const categories: ProductCategory[] = [
    "smartphones",
    "cases",
    "chargers",
    "screenProtectors",
    "audio",
    "batteries",
    "screens",
    "tools",
  ];
  const saleProducts = products
    .filter((p) => p.badge === "sale" || p.oldPrice)
    .slice(0, 4);
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);

  return (
    <div>
      <section className="gradient-hero border-b border-border">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <Badge tone="accent" className="mb-4">
              {dict.hero.badge}
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              {dict.hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LocaleLink href="/shop" className="btn btn-primary btn-lg">
                {dict.hero.shopNow}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </LocaleLink>
              <LocaleLink href="/repair" className="btn btn-secondary btn-lg">
                <Wrench className="size-4" />
                {dict.hero.bookRepair}
              </LocaleLink>
              <LocaleLink href="/academy" className="btn btn-accent btn-lg">
                <GraduationCap className="size-4" />
                {dict.hero.enrollCourses}
              </LocaleLink>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.key} className="rounded-xl border border-border bg-surface/70 p-3 backdrop-blur">
                  <dt className="text-xs text-muted">{dict.hero.stats[s.key]}</dt>
                  <dd className="text-xl font-extrabold text-brand">
                    {s.key === "rating"
                      ? `${formatCount(s.value, locale)}${s.suffix}`
                      : `${formatCount(s.value, locale)}${s.suffix}`}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            {[
              { ...dict.hero.promoCards.flashSale, icon: Star, href: "/shop", tone: "from-blue-600 to-indigo-500" },
              { ...dict.hero.promoCards.repair, icon: Wrench, href: "/repair", tone: "from-orange-600 to-amber-500" },
              { ...dict.hero.promoCards.academy, icon: GraduationCap, href: "/academy", tone: "from-emerald-600 to-teal-500" },
            ].map((card) => (
              <LocaleLink
                key={card.title}
                href={card.href}
                className={`group flex items-start gap-4 rounded-2xl bg-gradient-to-br ${card.tone} p-5 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <card.icon className="size-5" />
                </span>
                <span>
                  <span className="block font-bold">{card.title}</span>
                  <span className="mt-1 block text-sm text-white/85">{card.text}</span>
                </span>
                <ArrowRight className="ms-auto size-4 shrink-0 self-center opacity-70 transition group-hover:translate-x-0.5 rtl:rotate-180" />
              </LocaleLink>
            ))}
          </div>
        </div>

        <div className="container-page border-t border-border/60 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {dict.hero.trustedBy}
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(brandLabels) as Array<keyof typeof brandLabels>).map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-bold text-muted"
              >
                {brandLabels[b][locale]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          title={dict.sections.promotions}
          subtitle={dict.sections.promotionsSub}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="card relative overflow-hidden p-5"
              style={{
                backgroundImage: `linear-gradient(135deg, ${promo.accent.from}, ${promo.accent.to})`,
                borderColor: "transparent",
              }}
            >
              <div className="relative z-10 text-white">
                <Badge className="bg-white/20 text-white">
                  -{promo.discount}% · {promo.code}
                </Badge>
                <h3 className="mt-3 text-xl font-extrabold">{promo.title[locale]}</h3>
                <p className="mt-1 text-sm text-white/85">{promo.text[locale]}</p>
                <LocaleLink
                  href={promo.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold underline-offset-4 hover:underline"
                >
                  {dict.common.viewDetails}
                  <ArrowRight className="size-3.5 rtl:rotate-180" />
                </LocaleLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-6">
        <SectionHeading
          title={dict.sections.categories}
          subtitle={dict.sections.categoriesSub}
          action={
            <LocaleLink href="/shop" className="btn btn-secondary btn-sm">
              {dict.common.viewAll}
            </LocaleLink>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const tones = [
              "from-sky-500/15 to-sky-500/5 text-sky-600 dark:text-sky-400",
              "from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-400",
              "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
              "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
              "from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-400",
              "from-teal-500/15 to-teal-500/5 text-teal-600 dark:text-teal-400",
              "from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-400",
              "from-orange-500/15 to-orange-500/5 text-orange-600 dark:text-orange-400",
            ];
            return (
              <LocaleLink
                key={cat}
                href={`/shop?category=${cat}`}
                className={`rounded-2xl border border-border bg-gradient-to-br p-4 transition hover:-translate-y-0.5 hover:shadow-md ${tones[i]}`}
              >
                <span className="block text-base font-bold">
                  {categoryLabels[cat][locale]}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {products.filter((p) => p.category === cat).length}+
                </span>
              </LocaleLink>
            );
          })}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          title={dict.sections.featuredProducts}
          subtitle={dict.sections.featuredProductsSub}
          action={
            <LocaleLink href="/shop" className="btn btn-secondary btn-sm">
              {dict.common.viewAll}
            </LocaleLink>
          }
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <FlashSale products={saleProducts} />

      <section className="border-y border-border bg-surface">
        <div className="container-page py-12">
          <SectionHeading
            title={dict.sections.whyUs}
            subtitle={dict.sections.whyUsSub}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyUsIcons.map((item, idx) => {
              const texts = [
                dict.whyUs.warranty,
                dict.whyUs.experts,
                dict.whyUs.delivery,
                dict.whyUs.support,
              ];
              const Icon = [ShieldCheck, Users, Truck, Headphones][idx];
              return (
                <div key={item} className="card p-5">
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-bold">{texts[idx].title}</h3>
                  <p className="mt-1 text-sm text-muted">{texts[idx].text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          title={dict.sections.courses}
          subtitle={dict.sections.coursesSub}
          action={
            <LocaleLink href="/academy" className="btn btn-secondary btn-sm">
              {dict.common.viewAll}
            </LocaleLink>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredCourses.map((course) => (
            <LocaleLink
              key={course.id}
              href={`/academy/${course.slug}`}
              className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className="relative flex h-36 items-end p-4 text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})`,
                }}
              >
                <div>
                  <Badge className="bg-white/20 text-white">
                    {dict.academy.levels[course.level]}
                  </Badge>
                  <h3 className="mt-2 text-lg font-extrabold leading-tight">
                    {course.title[locale]}
                  </h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="line-clamp-2 text-sm text-muted">
                  {course.subtitle[locale]}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="size-3.5" />
                    {course.durationWeeks}w · {course.sessions} {dict.academy.course.sessions}
                  </span>
                  <Price amount={course.price} size="sm" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <Rating value={course.rating} count={course.students} />
                  <span className="flex items-center gap-1">
                    <GraduationCap className="size-3.5" />
                    {course.instructor.name[locale]}
                  </span>
                </div>
              </div>
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <SectionHeading title={dict.sections.testimonials} />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card p-5">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-muted">
                “{t.text[locale]}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold">{t.name[locale]}</span>
                <span className="block text-xs text-muted">{t.role[locale]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-r from-slate-900 to-slate-800 text-white dark:from-slate-950 dark:to-indigo-950">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">{dict.hero.title}</h2>
            <p className="mt-1 max-w-xl text-slate-300">{dict.hero.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LocaleLink href="/contact" className="btn btn-primary">
              <MessageCircle className="size-4" />
              {dict.nav.contact}
            </LocaleLink>
            <LocaleLink
              href="/repair/track"
              className="btn btn-secondary border-white/20 bg-white/10 text-white hover:text-white"
            >
              {dict.nav.trackRepair}
            </LocaleLink>
          </div>
        </div>
      </section>

      <Link href="/shop" className="sr-only">
        {dict.nav.shop}
      </Link>
    </div>
  );
}
