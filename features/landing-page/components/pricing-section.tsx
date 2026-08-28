"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLAN_FEATURES, PAID_PLANS, type PlanInterval } from "@/shared/lib/plans";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { MagneticGlassCard, GlassShape } from "@/shared/components/premium";

gsap.registerPlugin(ScrollTrigger);

const FREE_PLAN = {
  name: "Free",
  tier: "free" as const,
  features: PLAN_FEATURES.free,
};

export function PricingSection() {
  const { t } = useTranslation();
  const [interval, setInterval] = useState<PlanInterval>("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const visiblePlans = PAID_PLANS.filter((p) => p.interval === interval);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [interval]); // re-run animation when interval changes (cards re-render)

  return (
    <section ref={sectionRef} className="relative px-6 py-32 bg-[hsl(0,0%,10.2%,0.85)] overflow-hidden" id="pricing">
      <GlassShape shape="circle" size={250} top="-60px" left="-80px" tint="red" opacity={0.09} parallaxSpeed={0.3} />
      <GlassShape shape="rectangle" size={140} bottom="20%" right="-50px" tint="neutral" opacity={0.07} rotate={10} parallaxSpeed={-0.3} />
      <GlassShape shape="diamond" size={100} top="40%" left="3%" tint="white" opacity={0.05} rotate={-20} parallaxSpeed={0.4} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-[hsl(0,100%,97.3%)]">
            {t("landing.pricing.title") || "ADQUIRA O BOILERPLATE"}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base md:text-lg text-[hsl(0,0%,55%)]">
            {t("landing.pricing.subtitle") || "Poupe 100 horas de setup. Acesso vitalício ao código-fonte, atualizações contínuas e documentação completa."}
          </p>

          {/* Interval toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl bg-[hsl(0,0%,15%)] p-1 border border-[hsl(0,0%,20%)]">
            <button
              onClick={() => setInterval("monthly")}
              className={cn(
                "rounded-lg px-6 py-2 text-sm font-mono uppercase tracking-wider transition-all",
                interval === "monthly"
                  ? "bg-[hsl(351,97%,43.1%)] text-[hsl(0,100%,97.3%)] shadow-md shadow-black/50"
                  : "text-[hsl(0,0%,55%)] hover:text-[hsl(0,100%,97.3%)]",
              )}
            >
              {t("landing.pricing.monthly") || "Mensal"}
            </button>
            <button
              onClick={() => setInterval("annual")}
              className={cn(
                "rounded-lg px-6 py-2 text-sm font-mono uppercase tracking-wider transition-all",
                interval === "annual"
                  ? "bg-[hsl(351,97%,43.1%)] text-[hsl(0,100%,97.3%)] shadow-md shadow-black/50"
                  : "text-[hsl(0,0%,55%)] hover:text-[hsl(0,100%,97.3%)]",
              )}
            >
              {t("landing.pricing.annual") || "Anual"}
              <span className="ml-2 rounded bg-black/30 px-1.5 py-0.5 text-xs text-[hsl(0,100%,97.3%)]">
                -17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {/* Free Plan */}
          <div className="w-full h-full" ref={(el) => { cardsRef.current[0] = el; }}>
            <PlanCard
              name={FREE_PLAN.name}
              price="$0"
              priceLabel={t("common.free") || "Grátis"}
              features={[
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                t("landing.pricing.features.projects", { count: FREE_PLAN.features.maxProjects as any }),
                t("landing.pricing.features.storage", { amount: FREE_PLAN.features.storage }),
                t("landing.pricing.features.aiTokens", { count: FREE_PLAN.features.aiTokensMonthly }),
                t("landing.pricing.features.support", { type: FREE_PLAN.features.support }),
              ]}
              ctaLabel={t("landing.pricing.startFree") || "Começar Grátis"}
              ctaHref="/login"
            />
          </div>

          {/* Paid Plans */}
          {visiblePlans.map((plan, index) => (
            <div key={plan.slug} className="w-full h-full" ref={(el) => { cardsRef.current[index + 1] = el; }}>
              <PlanCard
                name={plan.name}
                price={`$${interval === "annual" ? Math.round(plan.priceUsd / 12) : plan.priceUsd}`}
                priceLabel={t("landing.pricing.perMonth") || "/mês"}
                billedNote={interval === "annual" ? (t("landing.pricing.billedAnnually") || "Cobrado anualmente") : undefined}
                features={[
                  plan.features.maxProjects === null
                    ? t("landing.pricing.features.projectsUnlimited")
                    : t("landing.pricing.features.projects", {
                        count: Number(plan.features.maxProjects),
                      }),
                  plan.features.storage === "Unlimited"
                    ? t("landing.pricing.features.storageUnlimited")
                    : t("landing.pricing.features.storage", { amount: plan.features.storage }),
                  t("landing.pricing.features.aiTokens", { count: plan.features.aiTokensMonthly }),
                  t("landing.pricing.features.support", { type: plan.features.support }),
                ]}
                ctaLabel={t("landing.pricing.upgrade") || "Fazer Upgrade"}
                ctaHref="/login"
                highlighted={plan.tier === "pro"}
                badge={plan.tier === "pro" ? (t("landing.pricing.mostPopular") || "Mais Popular") : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PlanCardProps {
  name: string;
  price: string;
  priceLabel: string;
  billedNote?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

function PlanCard({
  name,
  price,
  priceLabel,
  billedNote,
  features,
  ctaLabel,
  ctaHref,
  highlighted,
}: PlanCardProps) {
  const { t } = useTranslation();
  // Use MagneticGlassCard for the plan
  return (
    <MagneticGlassCard
      className={cn("flex flex-col", highlighted ? "lg:-mt-4 lg:mb-[-1rem] shadow-2xl" : "")}
      magneticStrength={15}
      badge={
        highlighted ? (
          <div className="rounded-full bg-[hsl(351,97%,43.1%)] px-3 py-1 text-[10px] font-heading uppercase tracking-widest text-[hsl(0,100%,97.3%)] shadow-[0_0_10px_rgba(217,3,36,0.5)]">
            {t("landing.pricing.popular") || "Mais Popular"}
          </div>
        ) : undefined
      }
    >
      <div className="flex h-full flex-col relative z-10">
        
        {/* If highlighted, add a persistent red glow inside */}
        {highlighted && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,3,36,0.25)_0%,_transparent_60%)] pointer-events-none mix-blend-screen"></div>
        )}

        <div className="flex flex-col h-full relative z-10 p-8">
          <div className="mb-6">
            <h3 className="mb-2 font-heading text-2xl uppercase tracking-tight text-[hsl(0,100%,97.3%)]">{name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl md:text-5xl text-[hsl(0,100%,97.3%)]">{price}</span>
              <span className="text-[hsl(0,0%,55%)] font-medium">{priceLabel}</span>
            </div>
            {billedNote && <p className="mt-2 text-sm text-[hsl(0,0%,40%)] font-mono">{billedNote}</p>}
          </div>

          <ul className="mb-8 flex-1 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[hsl(0,0%,70%)]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(351,97%,43.1%)]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link
              href={ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center rounded-none px-6 py-4 text-sm font-heading uppercase tracking-wider transition-all hover:scale-105",
                highlighted
                  ? "bg-[hsl(351,97%,43.1%)] text-[hsl(0,100%,97.3%)] shadow-[0_0_20px_rgba(217,3,36,0.4)]"
                  : "border border-[hsl(0,0%,30%)] bg-transparent text-[hsl(0,100%,97.3%)] hover:border-[hsl(351,97%,43.1%)] hover:bg-[hsl(351,97%,43.1%,0.1)]",
              )}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </MagneticGlassCard>
  );
}
