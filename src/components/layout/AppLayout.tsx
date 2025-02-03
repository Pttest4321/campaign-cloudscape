import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeToggle } from "./ThemeToggle";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end items-center gap-4 mb-6">
              <AppHeader />
              <ThemeToggle />
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}