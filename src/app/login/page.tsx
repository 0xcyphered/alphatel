"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShoppingCart, User, Wrench } from "lucide-react";
import { useI18n, useToast } from "@/components/providers";
import { LocaleLink } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { dict } = useI18n();
  const { push } = useToast();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    push(mode === "login" ? dict.auth.login : dict.auth.register);
    router.push("/account");
  };

  return (
    <div className="container-page flex justify-center py-12">
      <div className="w-full max-w-md">
        <div className="card p-6 sm:p-8">
          <div className="mb-6 text-center">
            <span className="gradient-brand mx-auto flex size-12 items-center justify-center rounded-2xl text-white">
              <User className="size-6" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold">
              {mode === "login" ? dict.auth.loginTitle : dict.auth.registerTitle}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {mode === "login"
                ? dict.auth.loginSubtitle
                : dict.auth.registerSubtitle}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "register" ? (
              <label className="block text-sm">
                <span className="mb-1 block text-muted">
                  {dict.academy.enroll.fullName}
                </span>
                <input
                  required
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
            ) : null}
            <label className="block text-sm">
              <span className="mb-1 block text-muted">{dict.common.email}</span>
              <input
                required
                type="email"
                className="input"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">
                {dict.common.password}
              </span>
              <input
                required
                type="password"
                minLength={4}
                className="input"
                dir="ltr"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
            <button type="submit" className="btn btn-primary w-full">
              {mode === "login" ? dict.auth.login : dict.auth.register}
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-muted">
            {dict.auth.demoHint}
          </p>

          <button
            type="button"
            className="mt-4 w-full text-center text-sm font-semibold text-brand hover:underline"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? dict.auth.noAccount
              : dict.auth.haveAccount}{" "}
            {mode === "login" ? dict.auth.createAccount : dict.auth.login}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <LocaleLink
            href="/cart"
            className="rounded-xl border border-border p-3 font-semibold text-muted hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="mx-auto mb-1 size-4" />
            {dict.nav.cart}
          </LocaleLink>
          <LocaleLink
            href="/repair/track"
            className="rounded-xl border border-border p-3 font-semibold text-muted hover:border-brand hover:text-brand"
          >
            <Wrench className="mx-auto mb-1 size-4" />
            {dict.nav.trackRepair}
          </LocaleLink>
          <LocaleLink
            href="/academy/dashboard"
            className={cn(
              "rounded-xl border border-border p-3 font-semibold text-muted hover:border-brand hover:text-brand",
            )}
          >
            <GraduationCap className="mx-auto mb-1 size-4" />
            {dict.nav.dashboard}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
