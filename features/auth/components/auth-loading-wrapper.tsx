"use client";

import { useEffect } from "react";
import { useAuthStore } from "../stores/auth-store";
import { useSession } from "@/shared/lib/auth-client";

/**
 * Wraps children with auth initialization and reactive session sync.
 * Must be placed inside the ReactQueryProvider in the component tree.
 */
export function AuthLoadingWrapper({ children }: { children: React.ReactNode }) {
  const { initialize, syncSession, initialized } = useAuthStore();
  const { data: sessionData, isPending } = useSession();

  // Initialize auth on mount
  useEffect(() => {
    void initialize();
  }, [initialize]);

  // Sync Better Auth reactive hook with Zustand store
  useEffect(() => {
    if (!isPending && initialized) {
      syncSession(sessionData?.user, sessionData?.session);
    }
  }, [sessionData, isPending, initialized, syncSession]);

  return <>{children}</>;
}
