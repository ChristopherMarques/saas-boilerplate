import { describe, it, expect } from "vitest";
import { z } from "zod";
import { validateQueryParams } from "./api-validation";

describe("api-validation", () => {
  describe("validateQueryParams", () => {
    const schema = z.object({
      page: z.coerce.number().int().positive(),
      search: z.string().optional(),
    });

    it("should parse valid params", () => {
      const result = validateQueryParams(schema, { page: "1", search: "test" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ page: 1, search: "test" });
      }
    });

    it("should reject invalid params", () => {
      const result = validateQueryParams(schema, { page: "invalid" });
      expect(result.success).toBe(false);
      if (!result.success) {
        // Zod validation should fail, triggering the error response
        expect(result.error).toBeDefined();
      }
    });
  });
});
