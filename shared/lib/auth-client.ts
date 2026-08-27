"use client";

import { createAuthClient } from "better-auth/react";

const getBaseURL = (): string => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession, getSession } = authClient;

/** Sign in specifically with Google OAuth. */
export async function signInWithGoogle() {
  return signIn.social({
    provider: "google",
    callbackURL: "/auth/callback",
  });
}

/** Sign out with redirect to home page. */
export async function logout() {
  try {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.assign("/");
        },
        onError: () => {
          window.location.assign("/");
        },
      },
    });
  } catch {
    window.location.assign("/");
  }
}

/** Hook to check if the current user has admin role. */
export function useIsAdmin() {
  const { data: session, isPending } = useSession();
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isAdmin: (session?.user as any)?.role === "admin",
    isLoading: isPending,
  };
}

/** Hook to get the current user with convenience fields. */
export function useUser() {
  const { data: session, isPending, error } = useSession();
  return {
    user: session?.user || null,
    isLoading: isPending,
    error,
    isAuthenticated: !!session?.user,
    session,
  };
}
