"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's an error from the OAuth provider
    const err = searchParams?.get("error");
    if (err) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(t("auth.callback.error"));
      setTimeout(() => router.push("/login"), 3000);
      return;
    }

    // Better Auth handles the actual session establishment via cookies automatically
    // The redirect happens here, but Better Auth middleware handles the heavy lifting
    router.push("/dashboard");
  }, [router, searchParams, t]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        {error ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive">
            <p className="font-medium">{error}</p>
            <p className="mt-2 text-sm opacity-80">Redirecting back to login...</p>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("auth.callback.title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("auth.callback.subtitle")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
