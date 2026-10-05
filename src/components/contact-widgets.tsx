"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useI18n, useToast } from "@/components/providers";
import { Badge } from "@/components/ui";
import { storeInfo } from "@/lib/data/site";

export function ContactForm() {
  const { dict } = useI18n();
  const { push } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    push(dict.contact.form.success);
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="size-12 text-emerald-500" />
        <h2 className="text-lg font-bold">{dict.contact.form.success}</h2>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setSent(false)}
        >
          {dict.contact.form.send}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">{dict.contact.form.title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.contact.form.name}</span>
          <input
            required
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.contact.form.email}</span>
          <input
            required
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.contact.form.phone}</span>
          <input
            className="input"
            dir="ltr"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.contact.form.subject}</span>
          <select
            className="input"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option value="general">{dict.contact.form.subjects.general}</option>
            <option value="order">{dict.contact.form.subjects.order}</option>
            <option value="repair">{dict.contact.form.subjects.repair}</option>
            <option value="course">{dict.contact.form.subjects.course}</option>
            <option value="sim">{dict.contact.form.subjects.sim}</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{dict.contact.form.message}</span>
        <textarea
          required
          rows={5}
          className="input"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>
      <button type="submit" className="btn btn-primary">
        {dict.contact.form.send}
      </button>
      <p className="text-xs text-muted">{dict.common.demoNotice}</p>
    </form>
  );
}

export function ContactInfo() {
  const { locale, dict } = useI18n();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    storeInfo.mapQuery,
  )}&z=15&output=embed`;

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold">
          <MapPin className="size-5 text-brand" />
          {dict.contact.info.title}
        </h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
            <div>
              <p className="text-xs text-muted">{dict.contact.info.address}</p>
              <p className="font-semibold">{storeInfo.address[locale]}</p>
              <a
                className="mt-1 inline-block text-xs font-semibold text-brand underline-offset-4 hover:underline"
                href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                {dict.contact.info.directions} →
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
            <div>
              <p className="text-xs text-muted">{dict.contact.info.phone}</p>
              {storeInfo.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/-/g, "")}`}
                  className="block font-semibold hover:text-brand"
                  dir="ltr"
                >
                  {p}
                </a>
              ))}
            </div>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
            <div>
              <p className="text-xs text-muted">{dict.contact.info.email}</p>
              {storeInfo.emails.map((m) => (
                <a
                  key={m}
                  href={`mailto:${m}`}
                  className="block font-semibold hover:text-brand"
                >
                  {m}
                </a>
              ))}
            </div>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand" />
            <div>
              <p className="text-xs text-muted">{dict.contact.info.hours}</p>
              <p className="font-semibold">{storeInfo.hours[locale]}</p>
            </div>
          </li>
        </ul>
        <a
          href={storeInfo.socials.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary mt-4 w-full"
        >
          <MessageCircle className="size-4" />
          {dict.contact.info.whatsapp}
        </a>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="font-bold">{dict.contact.info.mapTitle}</h2>
          <Badge tone="brand">Google Maps</Badge>
        </div>
        <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900">
          <iframe
            title={dict.contact.info.mapTitle}
            src={mapSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
