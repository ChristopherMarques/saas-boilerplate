"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { useAuthStore } from "@/features/auth";
import { usePathname, useSearchParams } from "next/navigation";
// --- Google Analytics 4 ---
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gaEvent = ({ action, category, label, value }: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// --- Analytics Provider Component ---
export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, initialized } = useAuthStore();

  // Initialize PostHog
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      !posthog.has_opted_in_capturing()
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loaded: (posthog: any) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }
  }, []);

  // Track pageviews for GA4 and PostHog
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      pageview(pathname);
      posthog?.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  // Identify user across analytics when auth state changes
  useEffect(() => {
    if (!initialized) return;

    if (user) {
      // PostHog Identify
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        plan: user.subscription_tier,
      });

      // Clarity Identify (if available)
      if (typeof window !== "undefined" && window.clarity) {
        window.clarity("set", "userId", user.id);
        window.clarity("set", "userEmail", user.email);
        window.clarity("set", "plan", user.subscription_tier);
      }
    } else {
      posthog.reset();
    }
  }, [user, initialized]);

  return null;
}

// Add global types for clarity and gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}
