"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Silence the specific React 19 warning in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origError.apply(console, args as any);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
