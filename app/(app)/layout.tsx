"use client";

import { useRequireAuth } from "@/features/auth";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { LayoutDashboard, Settings, CreditCard, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, initialized } = useRequireAuth();
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const pathname = usePathname();

  // Wait for auth to initialize before rendering anything
  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If we reach here but no user, useRequireAuth is handling the redirect
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <span className="bg-primary text-primary-foreground rounded-md p-1">
                {/* Minimal Logo placeholder */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 22h20L12 2z" />
                </svg>
              </span>
              {process.env.NEXT_PUBLIC_APP_NAME || "SaaS"}
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t("common.dashboard")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>{t("nav.dashboard")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>{t("common.settings")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/settings/profile"}>
                      <Link href="/settings/profile">
                        <Settings />
                        <span>{t("common.profile")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/settings/billing"}>
                      <Link href="/settings/billing">
                        <CreditCard />
                        <span>{t("nav.pricing")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-muted-foreground uppercase">
                    {(user.name || user.email || "U").charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">{user.name || "User"}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => signOut()}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut />
                  <span>{t("common.signOut")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="-ml-2" />
            <div className="flex-1" />
            {/* Additional header items (e.g. notifications) can go here */}
          </header>

          <div className="flex-1 p-6 overflow-auto">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
