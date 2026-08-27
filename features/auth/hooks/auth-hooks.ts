"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";

/** Redirects to login if user is not authenticated. */
export function useRequireAuth(redirectTo = "/login") {
  const { user, loading, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !loading && !user) {
      router.replace(redirectTo);
    }
  }, [user, loading, initialized, router, redirectTo]);

  return { user, loading, initialized, isAuthenticated: !!user };
}

/** Redirects to dashboard if user IS authenticated. */
export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const { user, loading, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !loading && user) {
      router.replace(redirectTo);
    }
  }, [user, loading, initialized, router, redirectTo]);

  return { user, loading, initialized };
}
