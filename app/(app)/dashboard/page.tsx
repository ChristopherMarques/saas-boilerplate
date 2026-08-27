"use client";

import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Folder, HardDrive, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const name = user?.name?.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {name ? t("dashboard.welcome", { name }) : t("dashboard.welcomeDefault")}
        </h1>
        <p className="text-muted-foreground mt-2">{t("dashboard.overview")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Plan Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.plan.title")}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary uppercase">
                {user?.subscription_tier === "free"
                  ? "F"
                  : user?.subscription_tier === "pro"
                    ? "P"
                    : "M"}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user?.subscription_tier || "Free"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link
                href="/settings/billing"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {t("dashboard.plan.upgrade")} <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Projects (Placeholder stats) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.stats.projects")}</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              0 /{" "}
              {user?.subscription_tier === "free"
                ? "1"
                : user?.subscription_tier === "pro"
                  ? "10"
                  : "∞"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active projects</p>
          </CardContent>
        </Card>

        {/* AI Tokens (Placeholder stats) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.stats.aiTokens")}</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground mt-1">Tokens remaining this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="border-dashed bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Folder className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">{t("dashboard.empty.title")}</h3>
          <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
            {t("dashboard.empty.subtitle")}
          </p>
          <Button>{t("dashboard.empty.cta")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
