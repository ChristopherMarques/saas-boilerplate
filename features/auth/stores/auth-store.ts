"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authClient } from "@/shared/lib/auth-client";
import { clearAllUserCaches } from "@/shared/lib/react-query";

export interface AppUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  subscription_tier?: string;
  role?: string;
}

export interface AppSession {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  user: AppUser;
}

export interface AuthState {
  user: AppUser | null;
  session: AppSession | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error?: { message: string } }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AppUser>) => Promise<{ error?: { message: string } }>;

  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  syncSession: (rawUser: unknown, rawSession: unknown) => void;
}

function mapSession(rawUser: Record<string, unknown>, rawSession: Record<string, unknown>) {
  const user: AppUser = {
    id: rawUser.id as string,
    email: rawUser.email as string,
    name: (rawUser.name as string) ?? undefined,
    image: (rawUser.image as string) ?? undefined,
    emailVerified: rawUser.emailVerified as boolean | undefined,
    subscription_tier: (rawUser.subscription_tier as string) ?? "free",
    role: (rawUser.role as string) ?? "user",
  };

  const session: AppSession = {
    id: rawSession.id as string,
    userId: rawSession.userId as string,
    expiresAt: new Date(rawSession.expiresAt as string),
    token: rawSession.token as string,
    user,
  };

  return { user, session };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: false,
      error: null,
      initialized: false,

      initialize: async () => {
        const state = get();
        if (state.initialized) return;
        if (!state.user) set({ loading: true, error: null });
        else set({ error: null });

        try {
          const sessionData = await authClient.getSession();
          if (sessionData?.data?.user && sessionData?.data?.session) {
            const { user, session } = mapSession(
              sessionData.data.user as Record<string, unknown>,
              sessionData.data.session as Record<string, unknown>,
            );
            set({ session, user, loading: false, initialized: true, error: null });
          } else {
            set({ session: null, user: null, loading: false, initialized: true, error: null });
          }
        } catch {
          set({ error: "Authentication initialization failed", loading: false, initialized: true });
        }
      },

      signInWithGoogle: async () => {
        try {
          set({ loading: true, error: null });
          const result = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth/callback",
          });
          if (result.error) {
            set({ error: result.error.message || "Google sign-in failed", loading: false });
            return { error: { message: result.error.message || "Google sign-in failed" } };
          }
          return {};
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Google sign-in failed";
          set({ error: msg, loading: false });
          return { error: { message: msg } };
        }
      },

      signOut: async () => {
        try {
          set({ loading: true, error: null });
          await authClient.signOut();
        } catch {
          // Continue with cleanup even if signOut fails
        } finally {
          clearAllUserCaches();
          set({ user: null, session: null, loading: false, error: null });
        }
      },

      updateProfile: async (updates) => {
        try {
          set({ loading: true, error: null });
          const currentUser = get().user;
          if (!currentUser) {
            set({ error: "Not authenticated", loading: false });
            return { error: { message: "Not authenticated" } };
          }

          if (updates.name) {
            const result = await authClient.updateUser({ name: updates.name });
            if (result.error) {
              set({ error: result.error.message ?? "Failed to update profile", loading: false });
              return { error: { message: result.error.message ?? "Failed to update profile" } };
            }
          }

          set({
            user: { ...currentUser, ...updates },
            loading: false,
          });
          return {};
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Profile update failed";
          set({ error: msg, loading: false });
          return { error: { message: msg } };
        }
      },

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      clearError: () => set({ error: null }),

      syncSession: (rawUser, rawSession) => {
        if (!rawUser || !rawSession) {
          const current = get();
          if (current.user && current.initialized) {
            set({ user: null, session: null, initialized: true });
          }
          return;
        }

        const current = get();
        const ru = rawUser as Record<string, unknown>;
        if (current.user?.id === ru.id && current.initialized && current.user?.name === ru.name) {
          return;
        }

        const { user, session } = mapSession(ru, rawSession as Record<string, unknown>);
        set({ user, session, loading: false, initialized: true, error: null });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    },
  ),
);

/** Convenience hook for common auth operations. */
export function useAuth() {
  const store = useAuthStore();
  return {
    user: store.user,
    session: store.session,
    loading: store.loading,
    error: store.error,
    initialized: store.initialized,
    isAuthenticated: !!store.user,
    initialize: store.initialize,
    signInWithGoogle: store.signInWithGoogle,
    signOut: store.signOut,
    updateProfile: store.updateProfile,
    clearError: store.clearError,
  };
}
