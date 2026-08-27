"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { PLAN_FEATURES, PAID_PLANS, type PlanInterval } from "@/shared/lib/plans";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const FREE_PLAN = {
  name: "Free",
  tier: "free" as const,
  features: PLAN_FEATURES.free,
};

export function PricingSection() {
  const { t } = useTranslation();
  const [interval, setInterval] = useState<PlanInterval>("monthly");

  const visiblePlans = PAID_PLANS.filter((p) => p.interval === interval);

  return (
    <section className="px-6 py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("landing.pricing.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            {t("landing.pricing.subtitle")}
          </p>

          {/* Interval toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl bg-muted p-1">
            <button
              onClick={() => setInterval("monthly")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                interval === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t("landing.pricing.monthly")}
            </button>
            <button
              onClick={() => setInterval("annual")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                interval === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t("landing.pricing.annual")}
              <span className="ml-1.5 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                -17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Free Plan */}
          <PlanCard
            name={FREE_PLAN.name}
            price="$0"
            priceLabel={t("common.free")}
            features={[
              t("landing.pricing.features.projects", { count: FREE_PLAN.features.maxProjects }),
              t("landing.pricing.features.storage", { amount: FREE_PLAN.features.storage }),
              t("landing.pricing.features.aiTokens", { count: FREE_PLAN.features.aiTokensMonthly }),
              t("landing.pricing.features.support", { type: FREE_PLAN.features.support }),
            ]}
            ctaLabel={t("landing.pricing.startFree")}
            ctaHref="/login"
          />

          {/* Paid Plans */}
          {visiblePlans.map((plan) => (
            <PlanCard
              key={plan.slug}
              name={plan.name}
              price={`$${interval === "annual" ? Math.round(plan.priceUsd / 12) : plan.priceUsd}`}
              priceLabel={t("landing.pricing.perMonth")}
              billedNote={interval === "annual" ? t("landing.pricing.billedAnnually") : undefined}
              features={[
                plan.features.maxProjects === null
                  ? t("landing.pricing.features.projectsUnlimited")
                  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    t("landing.pricing.features.projects", {
                      count: plan.features.maxProjects as any,
                    }),
                plan.features.storage === "Unlimited"
                  ? t("landing.pricing.features.storageUnlimited")
                  : t("landing.pricing.features.storage", { amount: plan.features.storage }),
                t("landing.pricing.features.aiTokens", { count: plan.features.aiTokensMonthly }),
                t("landing.pricing.features.support", { type: plan.features.support }),
              ]}
              ctaLabel={t("landing.pricing.upgrade")}
              ctaHref="/login"
              highlighted={plan.tier === "pro"}
              badge={plan.tier === "pro" ? t("landing.pricing.mostPopular") : undefined}
            />
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
  badge,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all",
        highlighted
          ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/10"
          : "border-border/50 bg-card",
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-foreground">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">{priceLabel}</span>
        </div>
        {billedNote && <p className="mt-1 text-sm text-muted-foreground">{billedNote}</p>}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5",
          highlighted
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            : "border border-border bg-background text-foreground hover:bg-muted",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
