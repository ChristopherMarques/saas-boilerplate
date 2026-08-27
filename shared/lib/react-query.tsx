"use client";

import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { lazy, useEffect, useState } from "react";
import { createIDBPersister } from "./offline/persister";
import { authClient } from "./auth-client";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? lazy(() =>
        import("@tanstack/react-query-devtools").then((m) => ({
          default: m.ReactQueryDevtools,
        })),
      )
    : () => null;

const CACHE_SCHEMA_VERSION = "v1";
const CACHE_BUSTER = process.env.NEXT_PUBLIC_APP_VERSION ?? `saas-${CACHE_SCHEMA_VERSION}`;

function makeQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error("[ReactQuery] Query error:", query.queryKey, error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        console.error("[ReactQuery] Mutation error:", mutation.options.mutationKey, error);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
          if (error instanceof Error && error.message.includes("4")) return false;
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 60_000),
        networkMode: "offlineFirst",
      },
      mutations: {
        retry: 0,
        networkMode: "offlineFirst",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;
function getQueryClient(): QueryClient {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

/** Clear all user caches on logout. */
export function clearAllUserCaches(): void {
  if (browserQueryClient) browserQueryClient.clear();
}

/** Wipe all caches for account deletion. */
export async function wipeAllCachesForAccountDeletion(): Promise<void> {
  if (typeof window === "undefined") return;
  if (browserQueryClient) browserQueryClient.clear();
  try {
    const { del } = await import("idb-keyval");
    await del("rq-cache");
  } catch {
    /* ignore */
  }
}

const LS_SCHEMA_KEY = "app-schema";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(getQueryClient);
  const [persister] = useState(() => createIDBPersister());

  // Schema sentinel: clear cache on version change
  useEffect(() => {
    const stored = localStorage.getItem(LS_SCHEMA_KEY);
    if (stored !== CACHE_BUSTER) {
      void Promise.resolve(persister.removeClient()).catch(() => {});
      queryClient.clear();
      localStorage.setItem(LS_SCHEMA_KEY, CACHE_BUSTER);
      authClient.getSession().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Revalidate session on reconnect before draining mutation queue
  useEffect(() => {
    const onOnline = () => {
      authClient.getSession().catch(() => {});
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: CACHE_BUSTER,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) =>
            query.state.data !== undefined && query.options?.meta?.persist !== false,
        },
      }}
      onSuccess={() => {
        void queryClient.resumePausedMutations();
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
