import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserTier, getProjectLimit } from "./rbac";
import { supabaseAdmin } from "./supabase-admin";

// Mock supabaseAdmin
vi.mock("./supabase-admin", () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
  },
}));

describe("rbac", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserTier", () => {
    it("should return the user's tier from db", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabaseAdmin.maybeSingle as any).mockResolvedValue({
        data: { subscription_tier: "pro" },
      });

      const tier = await getUserTier("test-user-id");
      expect(tier).toBe("pro");
    });

    it("should fallback to 'free' if tier is missing or invalid", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabaseAdmin.maybeSingle as any).mockResolvedValue({
        data: { subscription_tier: "invalid-tier" },
      });

      const tier = await getUserTier("test-user-id");
      expect(tier).toBe("free");
    });
  });

  describe("getProjectLimit", () => {
    it("should return the correct limit for free tier", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabaseAdmin.maybeSingle as any).mockResolvedValue({
        data: { subscription_tier: "free" },
      });

      const limit = await getProjectLimit("test-user-id");
      expect(limit).toBe(1);
    });

    it("should return -1 (unlimited) for max tier", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabaseAdmin.maybeSingle as any).mockResolvedValue({
        data: { subscription_tier: "max" },
      });

      const limit = await getProjectLimit("test-user-id");
      expect(limit).toBe(-1);
    });
  });
});
