"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useI18n } from "@/components/providers";

export function SectionHeading({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-2xl text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: "brand" | "accent" | "success" | "neutral" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-soft text-brand",
    accent: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    success:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    neutral:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  };
  return <span className={cn("badge", tones[tone], className)}>{children}</span>;
}

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      <span className="flex items-center gap-0.5 font-semibold text-amber-500">
        <Star className="size-3.5 fill-current" aria-hidden />
        {value.toFixed(1)}
      </span>
      {count !== undefined ? (
        <span className="text-muted">({count})</span>
      ) : null}
    </div>
  );
}

export function Price({
  amount,
  oldAmount,
  size = "md",
}: {
  amount: number;
  oldAmount?: number;
  size?: "sm" | "md" | "lg";
}) {
  const { locale } = useI18n();
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-extrabold",
  } as const;
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={cn("font-bold text-fg", sizes[size])}>
        {formatPrice(amount, locale)}
      </span>
      {oldAmount ? (
        <span className="text-sm text-muted line-through">
          {formatPrice(oldAmount, locale)}
        </span>
      ) : null}
    </div>
  );
}

export function ProductArt({
  art,
  label,
  className,
  rounded = "rounded-xl",
}: {
  art: { type: string; from: string; to: string };
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        rounded,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(145deg, ${art.from}, ${art.to})`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
      <DeviceGlyph type={art.type} />
      {label ? (
        <span className="absolute bottom-2 start-2 rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function DeviceGlyph({ type }: { type: string }) {
  const stroke = "rgba(255,255,255,0.9)";
  if (type === "phone") {
    return (
      <svg viewBox="0 0 80 140" className="h-[68%] w-auto drop-shadow-lg">
        <rect x="12" y="6" width="56" height="128" rx="10" fill="rgba(0,0,0,0.35)" stroke={stroke} strokeWidth="2" />
        <rect x="17" y="14" width="46" height="104" rx="6" fill="rgba(255,255,255,0.12)" />
        <circle cx="40" cy="126" r="4" fill="rgba(255,255,255,0.55)" />
        <rect x="32" y="9" width="16" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      </svg>
    );
  }
  if (type === "case") {
    return (
      <svg viewBox="0 0 80 140" className="h-[62%] w-auto drop-shadow-lg">
        <rect x="14" y="8" width="52" height="124" rx="14" fill="rgba(255,255,255,0.18)" stroke={stroke} strokeWidth="2" />
        <rect x="22" y="16" width="22" height="28" rx="8" fill="rgba(0,0,0,0.35)" />
      </svg>
    );
  }
  if (type === "charger") {
    return (
      <svg viewBox="0 0 100 100" className="h-[48%] w-auto drop-shadow-lg">
        <rect x="28" y="22" width="44" height="56" rx="10" fill="rgba(255,255,255,0.2)" stroke={stroke} strokeWidth="2" />
        <path d="M44 10v12M56 10v12" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M52 36l-8 16h12l-8 16" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "protector") {
    return (
      <svg viewBox="0 0 80 140" className="h-[60%] w-auto drop-shadow-lg">
        <rect x="16" y="10" width="48" height="120" rx="8" fill="rgba(255,255,255,0.16)" stroke={stroke} strokeWidth="2" strokeDasharray="6 4" />
        <path d="M28 70l10 10 18-22" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "battery") {
    return (
      <svg viewBox="0 0 80 120" className="h-[58%] w-auto drop-shadow-lg">
        <rect x="22" y="14" width="36" height="92" rx="6" fill="rgba(255,255,255,0.18)" stroke={stroke} strokeWidth="2" />
        <rect x="32" y="8" width="16" height="8" rx="2" fill="rgba(255,255,255,0.5)" />
        <rect x="28" y="70" width="24" height="28" rx="2" fill="rgba(255,255,255,0.45)" />
        <path d="M44 28l-10 22h12l-8 18" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "screen") {
    return (
      <svg viewBox="0 0 80 140" className="h-[64%] w-auto drop-shadow-lg">
        <rect x="10" y="8" width="60" height="124" rx="8" fill="rgba(255,255,255,0.2)" stroke={stroke} strokeWidth="2" />
        <rect x="16" y="16" width="48" height="100" rx="4" fill="rgba(255,255,255,0.12)" />
        <path d="M24 96l12-18 10 12 8-10 10 16" stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="126" r="3" fill="rgba(255,255,255,0.55)" />
      </svg>
    );
  }
  if (type === "tool") {
    return (
      <svg viewBox="0 0 100 100" className="h-[52%] w-auto drop-shadow-lg">
        <path d="M28 70l28-28" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
        <path d="M56 40l10-10 8 8-10 10" stroke={stroke} strokeWidth="5" fill="rgba(255,255,255,0.25)" strokeLinejoin="round" />
        <path d="M24 74l8 8" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <circle cx="72" cy="28" r="6" fill="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 80" className="h-[42%] w-auto drop-shadow-lg">
      <rect x="18" y="18" width="40" height="48" rx="14" fill="rgba(255,255,255,0.2)" stroke={stroke} strokeWidth="2" />
      <rect x="58" y="24" width="28" height="38" rx="12" fill="rgba(255,255,255,0.14)" stroke={stroke} strokeWidth="2" />
      <circle cx="38" cy="42" r="6" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function EmptyState({
  title,
  text,
  action,
  icon,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        {icon ?? <span className="text-2xl">◇</span>}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {text ? <p className="max-w-sm text-sm text-muted">{text}</p> : null}
      {action}
    </div>
  );
}

export function LocaleLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
