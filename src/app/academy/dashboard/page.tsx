import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { AcademyDashboard } from "@/components/academy-dashboard";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.academy.dashboard.title };
}

export default async function DashboardPage() {
  const dict = getDictionary();

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-3xl font-extrabold">
        {dict.academy.dashboard.title}
      </h1>
      <AcademyDashboard />
    </div>
  );
}
