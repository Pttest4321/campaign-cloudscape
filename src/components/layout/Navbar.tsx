import { Bell, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { AppHeader } from "./AppHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/campaigns":
      return "Campaigns";
    case "/campaigns/new":
      return "New Campaign";
    case "/statistics":
      return "Statistics";
    case "/team-users":
      return "Team Users";
    case "/profile":
      return "Profile";
    default:
      return "Dashboard";
  }
};

export function Navbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <Button variant="ghost" size="icon" className="md:hidden" asChild>
                <SidebarTrigger>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
              </Button>
            )}
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <AppHeader />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}