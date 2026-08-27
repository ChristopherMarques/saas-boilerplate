import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge tailwind classes properly", () => {
      const result = cn("bg-red-500", "bg-blue-500");
      expect(result).toBe("bg-blue-500"); // tailwind-merge gives precedence to the last class
    });

    it("should handle conditional classes", () => {
      const condition = true;
      const result = cn("text-sm", condition && "font-bold", !condition && "text-muted");
      expect(result).toBe("text-sm font-bold");
    });

    it("should merge arrays and objects", () => {
      const result = cn(["p-4", "m-4"], { "opacity-50": true, "opacity-100": false });
      expect(result).toBe("p-4 m-4 opacity-50");
    });
  });
});
