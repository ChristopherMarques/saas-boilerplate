"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              {process.env.NEXT_PUBLIC_APP_NAME || "SaaS App"}
            </h3>
            <p className="text-sm text-muted-foreground">{t("landing.footer.description")}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              {t("landing.footer.product")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  {t("nav.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              {t("landing.footer.company")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t("landing.footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  {t("landing.footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  {t("landing.footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              {t("landing.footer.legal")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  {t("landing.footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  {t("landing.footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {year} {process.env.NEXT_PUBLIC_APP_NAME || "SaaS App"}. {t("landing.footer.rights")}
        </div>
      </div>
    </footer>
  );
}
