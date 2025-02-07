import { Home, BarChart2, Users, Settings, PlusCircle, Layout, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Layout, label: "Campaigns", path: "/campaigns" },
  { icon: PlusCircle, label: "New Campaign", path: "/campaigns/new" },
  { icon: BarChart2, label: "Statistics", path: "/statistics" },
  { icon: Users, label: "Team Users", path: "/team-users" },
  { icon: Settings, label: "Profile", path: "/profile" },
];

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-background">
        <div className="p-4">
          {isMobile && (
            <div className="flex justify-end mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(false)}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
          <h1 className="text-2xl font-bold text-primary">Campaign Hub</h1>
          <div className="mt-4 flex items-center space-x-3 px-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}