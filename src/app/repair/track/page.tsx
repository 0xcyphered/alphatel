import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/i18n/dictionary";
import { RepairTracker } from "@/components/repair-tracker";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.repair.status.title };
}

export default async function RepairTrackPage() {
  const dict = getDictionary();

  return (
    <div className="container-page py-10">
      <h1 className="mb-2 text-3xl font-extrabold">
        {dict.repair.status.title}
      </h1>
      <p className="mb-8 text-muted">{dict.repair.status.subtitle}</p>
      <Suspense fallback={<div className="card h-40 shimmer" />}>
        <RepairTracker />
      </Suspense>
    </div>
  );
}
