"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { GlassShape } from "@/shared/components/premium";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(0,0%,20%)] bg-transparent px-6 py-20 overflow-hidden z-20">
      <GlassShape shape="rectangle" size={200} top="-100px" left="40%" tint="red" opacity={0.06} rotate={5} parallaxSpeed={0.2} blur={24} />
      <GlassShape shape="circle" size={150} bottom="10%" right="10%" tint="white" opacity={0.04} parallaxSpeed={-0.2} />
      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        <h2 className="text-[12vw] font-heading uppercase leading-none tracking-tighter text-[hsl(0,0%,20%)] select-none text-center mb-16">
          {process.env.NEXT_PUBLIC_APP_NAME || "BOILERPLATE"}
        </h2>

        <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-[hsl(0,0%,15%)] pt-12">
          <div>
            <h3 className="mb-4 font-heading text-xl uppercase tracking-tighter text-[hsl(0,100%,97.3%)]">
              {process.env.NEXT_PUBLIC_APP_NAME || "SaaS App"}
            </h3>
            <p className="text-sm text-[hsl(0,0%,55%)] leading-relaxed">
              {t("landing.footer.description") || "O alicerce definitivo para aplicações web agressivas."}
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-[hsl(351,97%,43.1%)]">
              {t("landing.footer.product") || "Acesso"}
            </h4>
            <ul className="space-y-3 text-sm text-[hsl(0,0%,65%)] font-sans">
              <li>
                <Link href="#features" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("nav.features") || "Stack Técnica"}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("nav.pricing") || "Adquirir Código"}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("nav.faq") || "Perguntas"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-[hsl(351,97%,43.1%)]">
              {t("landing.footer.company") || "Suporte"}
            </h4>
            <ul className="space-y-3 text-sm text-[hsl(0,0%,65%)] font-sans">
              <li>
                <Link href="/docs" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/discord" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  Comunidade VIP
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("landing.footer.contact") || "Contato"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-[hsl(351,97%,43.1%)]">
              {t("landing.footer.legal") || "Jurídico"}
            </h4>
            <ul className="space-y-3 text-sm text-[hsl(0,0%,65%)] font-sans">
              <li>
                <Link href="/terms" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("landing.footer.terms") || "Licença de Uso"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[hsl(0,100%,97.3%)] transition-colors">
                  {t("landing.footer.privacy") || "Privacidade"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 w-full border-t border-[hsl(0,0%,20%)] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[hsl(0,0%,45%)] font-sans">
          <p>© {year} {process.env.NEXT_PUBLIC_APP_NAME || "SaaS App"}. {t("landing.footer.rights") || "Todos os direitos reservados."}</p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-[hsl(351,97%,43.1%)] animate-pulse shadow-[0_0_8px_rgba(217,3,36,0.8)]"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-[hsl(351,97%,43.1%)]">
              SISTEMA ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
