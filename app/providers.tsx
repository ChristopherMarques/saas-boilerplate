"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { ErrorBoundary } from "@/shared/components/error-boundary";
import { AuthLoadingWrapper } from "@/features/auth";
import { ReactQueryProvider } from "@/shared/lib/react-query";
import { Toaster } from "sonner";
import { initI18n } from "@/shared/i18n";
import { AnalyticsProvider } from "@/shared/lib/analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ReactQueryProvider>
          <AuthLoadingWrapper>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
            <AnalyticsProvider />
          </AuthLoadingWrapper>
        </ReactQueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
