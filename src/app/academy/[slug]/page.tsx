import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data/courses";
import { CourseDetails } from "@/components/course-details";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale: Locale = "fa";
  const course = getCourse(slug);
  if (!course) return { title: "404" };
  return { title: course.title[locale], description: course.subtitle[locale] };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <CourseDetails course={course} />;
}
