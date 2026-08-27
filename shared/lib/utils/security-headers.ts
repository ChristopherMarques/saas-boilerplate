import { NextResponse } from "next/server";

type CspMode = "enforce" | "report-only" | "off";

function cspMode(): CspMode {
  const mode = process.env.CSP_MODE;
  if (mode === "enforce" || mode === "off") return mode;
  return "report-only";
}

function buildCsp(): string {
  const upgradeInsecure = cspMode() === "enforce" && process.env.NODE_ENV === "production";

  return [
    ...(upgradeInsecure ? ["upgrade-insecure-requests"] : []),
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' https:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com",
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join("; ");
}

export const securityHeaders = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "X-Powered-By": "",
};

export function applySecurityHeaders(response: NextResponse): NextResponse {
  const mode = cspMode();
  const csp = buildCsp();

  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (value) response.headers.set(key, value);
    else response.headers.delete(key);
  });

  response.headers.delete("Content-Security-Policy");
  response.headers.delete("Content-Security-Policy-Report-Only");
  if (mode === "enforce") {
    response.headers.set("Content-Security-Policy", csp);
  } else if (mode === "report-only") {
    response.headers.set("Content-Security-Policy-Report-Only", csp);
  }

  return response;
}

export function createErrorResponse(message: string, status = 400): NextResponse {
  return applySecurityHeaders(
    NextResponse.json({ error: message, timestamp: new Date().toISOString() }, { status }),
  );
}

export function createSuccessResponse<T>(data: T, message?: string, status = 200): NextResponse {
  return applySecurityHeaders(
    NextResponse.json(
      { success: true, data, message, timestamp: new Date().toISOString() },
      { status },
    ),
  );
}

export const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "development" ? "*" : process.env.NEXT_PUBLIC_APP_URL || "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export function applyCorsHeaders(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
