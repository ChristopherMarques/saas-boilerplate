"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useLocale } from "@/shared/i18n/use-locale";
import { LANGUAGE_LABELS } from "@/shared/i18n";
import { useAuthStore } from "@/features/auth";

export function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { locale, toggleLocale } = useLocale();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-foreground">
          {process.env.NEXT_PUBLIC_APP_NAME || "SaaS"}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.features")}
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.pricing")}
          </Link>
          <Link
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.faq")}
          </Link>

          <button
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t("a11y.switchLanguage")}
          >
            <Globe className="h-4 w-4" />
            {LANGUAGE_LABELS[locale]}
          </button>

          <Link
            href={user ? "/dashboard" : "/login"}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {user ? t("nav.dashboard") : t("nav.login")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "border-t border-border/40 bg-background md:hidden transition-all overflow-hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-3 px-6 py-4">
          <Link
            href="#features"
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground"
          >
            {t("nav.features")}
          </Link>
          <Link
            href="#pricing"
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground"
          >
            {t("nav.pricing")}
          </Link>
          <Link
            href="#faq"
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground"
          >
            {t("nav.faq")}
          </Link>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
            {LANGUAGE_LABELS[locale]}
          </button>
          <Link
            href={user ? "/dashboard" : "/login"}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            {user ? t("nav.dashboard") : t("nav.login")}
          </Link>
        </div>
      </div>
    </header>
  );
}
