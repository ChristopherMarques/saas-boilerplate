"use client";

import { useTranslation } from "react-i18next";
import { useAuth, useRedirectIfAuthenticated } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa"; // You might need to install react-icons if not already

export default function LoginPage() {
  const { t } = useTranslation();
  const { signInWithGoogle, loading, error } = useAuth();

  // Guard: if already logged in, redirect to dashboard
  useRedirectIfAuthenticated("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md shadow-lg border-border/50">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {t("auth.login.title")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("auth.login.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-11 flex items-center justify-center gap-2 hover:bg-muted"
            onClick={() => signInWithGoogle()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <FaGoogle className="h-5 w-5" />
            )}
            <span className="font-medium">
              {loading ? t("common.loading") : t("auth.login.googleButton")}
            </span>
          </Button>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center border border-destructive/20">
              {error}
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground mt-4">
            {t("auth.login.noAccount")}{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              {t("auth.login.signUp")}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
