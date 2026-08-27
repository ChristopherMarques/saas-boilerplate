import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const isServer = typeof window === "undefined";

if (isServer && (!supabaseUrl || !supabaseServiceKey)) {
  console.warn("Missing Supabase environment variables for admin client");
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _supabaseAdmin: any | undefined;
}

function createSupabaseAdmin() {
  if (!isServer || !supabaseUrl || !supabaseServiceKey) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Proxy({} as any, {
      get: () => {
        throw new Error("supabaseAdmin cannot be used on the client-side");
      },
    });
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "x-client-info": "saas-boilerplate-admin",
        "x-connection-mode": "transaction",
      },
    },
  });
}

export const supabaseAdmin =
  global._supabaseAdmin ?? (global._supabaseAdmin = createSupabaseAdmin());
