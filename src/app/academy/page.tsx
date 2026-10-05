import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { getDictionary } from "@/i18n/dictionary";
import { AcademyBrowser } from "@/components/academy-browser";
import { LocaleLink } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.academy.title, description: dict.academy.subtitle };
}

export default async function AcademyPage() {
  const dict = getDictionary();

  return (
    <div className="container-page py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
            <GraduationCap className="size-4" />
            {dict.academy.catalog}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {dict.academy.title}
          </h1>
          <p className="mt-1 max-w-2xl text-muted">{dict.academy.subtitle}</p>
        </div>
        <LocaleLink href="/academy/dashboard" className="btn btn-secondary">
          {dict.nav.dashboard}
        </LocaleLink>
      </div>
      <AcademyBrowser />
    </div>
  );
}
