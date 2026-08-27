"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

let currentAccessToken: string | null = null;

export function getDirectAccessToken(): string | null {
  return currentAccessToken;
}

export function setDirectAccessToken(token: string | null): void {
  currentAccessToken = token;
  if (token) {
    supabase.realtime.setAuth(token);
  } else {
    supabase.realtime.setAuth(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
}

const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  if (currentAccessToken) {
    init = init || {};
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${currentAccessToken}`);
    init.headers = headers;
  }
  return fetch(input, init);
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: customFetch,
      headers: {
        "x-client-info": "saas-boilerplate-client",
      },
    },
    realtime: {
      heartbeatIntervalMs: 30_000,
      reconnectAfterMs: (tries) => Math.min(tries * 1000, 30_000),
    },
  },
);

export function getClient() {
  return supabase;
}

export async function setUserToken(accessToken: string): Promise<void> {
  setDirectAccessToken(accessToken);
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Inserts<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updates<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
