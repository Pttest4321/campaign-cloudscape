import { Bell, Globe, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type Notification = {
  id: number;
  message: string;
  time: string;
};

const initialNotifications: Notification[] = [
  { id: 1, message: "New campaign created", time: "5 min ago" },
  { id: 2, message: "Campaign statistics updated", time: "1 hour ago" },
  { id: 3, message: "Weekly report available", time: "2 hours ago" },
];

export function AppHeader() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const { toast } = useToast();

  const clearNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    });
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Language has been changed to ${lang}`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/auth/login">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage("English")}>
            English {currentLanguage === "English" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("Spanish")}>
            Spanish {currentLanguage === "Spanish" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("French")}>
            French {currentLanguage === "French" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-semibold">Notifications</span>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                <div className="text-sm">{notification.message}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}