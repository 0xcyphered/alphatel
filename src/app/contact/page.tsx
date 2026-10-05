import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { ContactForm, ContactInfo } from "@/components/contact-widgets";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary();
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage() {
  const dict = getDictionary();

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {dict.contact.title}
        </h1>
        <p className="mt-1 text-muted">{dict.contact.subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
