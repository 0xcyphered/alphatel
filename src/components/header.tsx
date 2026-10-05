"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
  Wrench,
  GraduationCap,
  Smartphone,
} from "lucide-react";
import { useCart, useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "simCards", href: "/sim-cards" },
  { key: "repair", href: "/repair" },
  { key: "academy", href: "/academy" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const emptySubscribe = () => () => {};
const mountedServer = () => false;
const mountedClient = () => true;

export function Header() {
  const { dir, dict } = useI18n();
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const mounted = useSyncExternalStore(emptySubscribe, mountedClient, mountedServer);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(`/shop${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-xl">
      <div className="border-b border-border/70 bg-slate-900 text-slate-100 dark:bg-black">
        <div className="container-page flex h-9 items-center justify-between gap-3 text-xs">
          <p className="truncate font-medium">🚚 {dict.hero.badge}</p>
          <div className="hidden items-center gap-4 text-slate-300 sm:flex">
            <span>021-9100-1234</span>
            <span className="hidden md:inline">{dict.common.demoNotice}</span>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center gap-3">
        <button
          type="button"
          className="btn btn-ghost md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="gradient-brand flex size-9 items-center justify-center rounded-xl text-white shadow-sm">
            <Smartphone className="size-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Alpha<span className="text-brand">Tel</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-brand-soft text-brand"
                    : "text-muted hover:bg-slate-100 hover:text-fg dark:hover:bg-slate-800",
                )}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={onSearch}
          className="relative ms-auto hidden w-40 lg:w-56 xl:w-64"
          role="search"
        >
          <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted start-3" />
          <input
            className="input ps-9 text-sm"
            placeholder={dict.common.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={dict.common.search}
          />
        </form>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="btn btn-ghost relative"
            onClick={() => setOpen(true)}
            aria-label={dict.cart.badge}
          >
            <ShoppingCart className="size-5" />
            {mounted && count > 0 ? (
              <span className="absolute -top-0.5 end-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                {count}
              </span>
            ) : null}
          </button>

          <Link
            href="/login"
            className="btn btn-ghost hidden sm:inline-flex"
            aria-label={dict.nav.account}
          >
            <User className="size-5" />
          </Link>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label={dict.theme.toggle}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div className="container-page pb-3 lg:hidden">
        <form onSubmit={onSearch} className="relative" role="search">
          <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted start-3" />
          <input
            className="input ps-9 text-sm"
            placeholder={dict.common.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={dict.common.search}
          />
        </form>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                {dict.nav[item.key]}
              </Link>
            ))}
            <div className="mt-1 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Link
                href="/login"
                className="btn btn-secondary btn-sm"
              >
                <User className="size-4" /> {dict.nav.login}
              </Link>
              <Link
                href="/repair/track"
                className="btn btn-secondary btn-sm"
              >
                <Wrench className="size-4" /> {dict.nav.trackRepair}
              </Link>
              <Link
                href="/academy/dashboard"
                className="btn btn-secondary btn-sm"
              >
                <GraduationCap className="size-4" /> {dict.nav.dashboard}
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setMobileOpen(false)}
              >
                {dict.nav.closeMenu}
              </button>
            </div>
          </nav>
        </div>
      ) : null}
      <span className="sr-only">{dir}</span>
    </header>
  );
}
