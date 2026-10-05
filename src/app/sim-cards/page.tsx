import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SimBrowser } from "@/components/sim-browser";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.sim.title, description: dict.sim.subtitle };
}

export default async function SimPage() {
  const dict = getDictionary();

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{dict.sim.title}</h1>
        <p className="mt-1 max-w-2xl text-muted">{dict.sim.subtitle}</p>
      </div>
      <SimBrowser />
    </div>
  );
}
