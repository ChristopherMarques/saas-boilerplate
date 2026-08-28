import "server-only";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Ensure we reuse a single PostgreSQL Pool across hot-reloads
declare global {
  var _pgPool: Pool | undefined;
}

function getDatabasePool(): Pool {
  if (global._pgPool) return global._pgPool;

  const connectionString = process.env.DATABASE_URL!;
  const isSupabase = connectionString?.includes("supabase.com");

  const pool = new Pool({
    connectionString,
    max: 3,
    min: 0,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 3_000,
    query_timeout: 30_000,
    statement_timeout: 15_000,
    application_name: "saas-auth",
    keepAlive: true,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
  });

  pool.on("error", (err) => {
    console.error("[Auth] PostgreSQL pool error:", err);
  });

  global._pgPool = pool;
  return pool;
}

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  database: getDatabasePool(),

  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },

  emailAndPassword: {
    enabled: false,
  },

  socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["email", "profile"],
    },
  } : undefined,

  session: {
    // 60 days — users who open the app sporadically shouldn't be logged out
    expiresIn: 60 * 60 * 24 * 60,
    // Rolling: extend session on use after 1 day
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 10, // 10 minutes
    // Cookie cache: get-session responds without hitting Postgres
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  user: {
    additionalFields: {
      subscription_tier: {
        type: "string",
        defaultValue: "free",
      },
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthUser = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthSession = any;
