import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeToggle } from "./ThemeToggle";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollToTop } from "@/components/ScrollToTop";

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto w-full">
          <div className="w-full">
            <div className="flex justify-between items-center gap-4 mb-6">
              {isMobile && (
                <Button variant="ghost" size="icon" className="md:hidden" asChild>
                  <SidebarTrigger>
                    <Menu className="h-5 w-5" />
                  </SidebarTrigger>
                </Button>
              )}
              <div className="flex items-center gap-4 ml-auto">
                <AppHeader />
                <ThemeToggle />
              </div>
            </div>
            <Outlet />
          </div>
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
}