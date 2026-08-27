/**
 * Token exchange: Better Auth session → Supabase-compatible JWT.
 *
 * Flow:
 *   1. Client POSTs with Better Auth session cookie
 *   2. We validate the session via Better Auth
 *   3. We resolve the public.users.id from the Better Auth user
 *   4. We sign a JWT with SUPABASE_JWT_SECRET
 *   5. Client uses supabase.auth.setSession() with this token
 */
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { auth } from "@/shared/lib/auth";

const TOKEN_EXPIRY_SECONDS = 60 * 60; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    const userId = session?.user?.id;
    const email = session?.user?.email;

    if (!userId || !email) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }

    const jwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!jwtSecret) {
      console.error("[supabase-token] SUPABASE_JWT_SECRET not configured");
      return NextResponse.json({ error: "JWT configuration missing" }, { status: 500 });
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const now = Math.floor(Date.now() / 1000);

    const accessToken = await new SignJWT({
      sub: userId,
      role: "authenticated",
      aud: "authenticated",
      email,
      iat: now,
      exp: now + TOKEN_EXPIRY_SECONDS,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt(now)
      .setExpirationTime(now + TOKEN_EXPIRY_SECONDS)
      .setSubject(userId)
      .sign(secret);

    return NextResponse.json({
      access_token: accessToken,
      refresh_token: accessToken,
      expires_in: TOKEN_EXPIRY_SECONDS,
      expires_at: now + TOKEN_EXPIRY_SECONDS,
      token_type: "bearer",
      user_id: userId,
    });
  } catch (error) {
    console.error("[supabase-token] Error:", error);
    return NextResponse.json({ error: "Failed to generate Supabase token" }, { status: 500 });
  }
}
