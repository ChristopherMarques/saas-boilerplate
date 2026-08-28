"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useLocale } from "@/shared/i18n/use-locale";
import { LANGUAGE_LABELS } from "@/shared/i18n";
import { useAuthStore } from "@/features/auth";

export function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale, toggleLocale } = useLocale();
  const { user } = useAuthStore();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(currentScrollY > 50);
    };

    // Use both window and capture-phase document listeners to guarantee we catch the scroll event
    // regardless of which element is actually scrolling (in case of Locomotive, Lenis, or custom layout wrappers).
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500",
      isScrolled ? "py-4" : "py-0"
    )}>
      <header 
        className={cn(
          "transition-all duration-500 overflow-hidden w-full",
          isScrolled 
            ? "max-w-7xl rounded-full border border-[hsl(0,0%,20%)] bg-[hsl(0,0%,8%)]/90 backdrop-blur-xl shadow-2xl" 
            : "max-w-full border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt={process.env.NEXT_PUBLIC_APP_NAME || "Logo"}
                width={40}
                height={40}
                className="filter drop-shadow-[0_0_15px_rgba(217,3,36,0.8)] brightness-150"
                style={{ width: 'auto', height: '40px' }}
                priority
              />
            </div>
            <span className="font-heading text-xl uppercase tracking-tighter text-[hsl(0,100%,97.3%)] hidden sm:block whitespace-nowrap">
              SAAS <span className="text-[hsl(351,97%,43.1%)]">BOILERPLATE</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-4 lg:gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,60%)] hover:text-[hsl(0,100%,97.3%)] transition-colors whitespace-nowrap"
            >
              {t("nav.features")}
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,60%)] hover:text-[hsl(0,100%,97.3%)] transition-colors whitespace-nowrap"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="#faq"
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,60%)] hover:text-[hsl(0,100%,97.3%)] transition-colors whitespace-nowrap"
            >
              {t("nav.faq")}
            </Link>

            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,60%)] hover:text-[hsl(0,100%,97.3%)] transition-colors whitespace-nowrap"
              aria-label={t("a11y.switchLanguage")}
            >
              <Globe className="h-4 w-4" />
              {LANGUAGE_LABELS[locale]}
            </button>

            <Link
              href={user ? "/dashboard" : "/login"}
              className="rounded-full bg-[hsl(351,97%,43.1%)] px-6 py-2.5 text-sm font-heading uppercase tracking-widest text-[hsl(0,100%,97.3%)] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(217,3,36,0.3)] whitespace-nowrap"
            >
              {user ? t("nav.dashboard") : t("nav.login")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[hsl(0,100%,97.3%)]"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300",
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col gap-4 px-6 py-6 border-t border-[hsl(0,0%,20%)] bg-[hsl(0,0%,8%)]/95">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,70%)]"
            >
              {t("nav.features")}
            </Link>
            <Link
              href="#pricing"
              onClick={() => setOpen(false)}
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,70%)]"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="#faq"
              onClick={() => setOpen(false)}
              className="text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,70%)]"
            >
              {t("nav.faq")}
            </Link>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,70%)]"
            >
              <Globe className="h-4 w-4" />
              {LANGUAGE_LABELS[locale]}
            </button>
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-none bg-[hsl(351,97%,43.1%)] px-5 py-3 text-center text-sm font-heading uppercase tracking-widest text-[hsl(0,100%,97.3%)]"
            >
              {user ? t("nav.dashboard") : t("nav.login")}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
