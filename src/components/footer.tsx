"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Send,
  Video,
  AtSign,
  Smartphone,
  Mail,
  MapPin,
} from "lucide-react";
import { useI18n } from "@/components/providers";
import { storeInfo, payments } from "@/lib/data/site";
import { useToast } from "@/components/providers";

export function Footer() {
  const { locale, dict } = useI18n();
  const { push } = useToast();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    push(dict.footer.subscribed);
    setEmail("");
  };

  const quickLinks = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.shop, href: "/shop" },
    { label: dict.nav.simCards, href: "/sim-cards" },
    { label: dict.nav.repair, href: "/repair" },
    { label: dict.nav.academy, href: "/academy" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  const serviceLinks = [
    { label: dict.nav.trackRepair, href: "/repair/track" },
    { label: dict.nav.dashboard, href: "/academy/dashboard" },
    { label: dict.nav.login, href: "/login" },
    { label: dict.nav.cart, href: "/cart" },
    { label: dict.footer.faq, href: "/contact" },
    { label: dict.footer.terms, href: "/about" },
    { label: dict.footer.privacy, href: "/about" },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <span className="gradient-brand flex size-9 items-center justify-center rounded-xl text-white">
              <Smartphone className="size-5" />
            </span>
            <span className="text-lg font-extrabold">
              Alpha<span className="text-brand">Tel</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">{dict.footer.tagline}</p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              {storeInfo.address[locale]}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-brand" />
              {storeInfo.emails[0]}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            {[
              { icon: AtSign, href: storeInfo.socials.instagram, label: "Instagram" },
              { icon: Send, href: storeInfo.socials.telegram, label: "Telegram" },
              { icon: Globe, href: storeInfo.socials.twitter, label: "X" },
              { icon: Video, href: storeInfo.socials.youtube, label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-brand hover:text-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
            {dict.footer.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href === "/" ? "/" : l.href}
                  className="text-muted transition hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
            {dict.footer.services}
          </h3>
          <ul className="space-y-2 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="text-muted transition hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
            {dict.footer.newsletter}
          </h3>
          <p className="text-sm text-muted">{dict.footer.newsletterText}</p>
          <form onSubmit={subscribe} className="mt-3 flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.common.email}
              className="input text-sm"
              aria-label={dict.common.email}
            />
            <button type="submit" className="btn btn-primary btn-sm shrink-0">
              {dict.footer.subscribe}
            </button>
          </form>
          <p className="mt-5 text-sm font-semibold text-muted">
            {dict.footer.payment}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-border bg-bg px-2 py-1 text-[11px] font-semibold text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} AlphaTel. {dict.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-brand">
              {dict.footer.terms}
            </Link>
            <Link href="/about" className="hover:text-brand">
              {dict.footer.privacy}
            </Link>
            <Link href="/about" className="hover:text-brand">
              {dict.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
