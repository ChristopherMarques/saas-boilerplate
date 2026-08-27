import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "SaaS Boilerplate";

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: "Production-ready SaaS boilerplate with authentication, payments, i18n, and more.",
  keywords: ["SaaS", "boilerplate", "Next.js", "React", "TypeScript"],
  authors: [{ name: appName }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: appName,
    title: appName,
    description: "Production-ready SaaS boilerplate with authentication, payments, i18n, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: "Production-ready SaaS boilerplate with authentication, payments, i18n, and more.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
