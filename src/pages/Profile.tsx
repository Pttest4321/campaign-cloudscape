import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, User, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Time zones list - using a static list of common time zones
const timeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
  "Indian/Mayotte"
];

interface UserProfile {
  email: string;
  createdAt: string;
  paidUntil: string;
  activeTariff: string;
  campaignsCount: number;
  clicksUsed: number;
  timeZone: string;
  telegram: string;
  notifications: {
    all: boolean;
    payment: boolean;
    moderation: boolean;
    clicksFraud: boolean;
    ddos: boolean;
  };
}

export default function Profile() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"info" | "notifications">("info");
  
  const [profile, setProfile] = useState<UserProfile>({
    email: "affbeat@proton.me",
    createdAt: "2024-09-04",
    paidUntil: "2025-02-04",
    activeTariff: "SMALL",
    campaignsCount: 3,
    clicksUsed: 45571,
    timeZone: "Indian/Mayotte",
    telegram: "@tryharder0x01",
    notifications: {
      all: true,
      payment: true,
      moderation: true,
      clicksFraud: true,
      ddos: true,
    },
  });

  const [open, setOpen] = useState(false);

  const handleTimeZoneChange = (timezone: string) => {
    setProfile(prev => ({
      ...prev,
      timeZone: timezone
    }));
    setOpen(false);
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      telegram: e.target.value
    }));
  };

  const handleNotificationChange = (key: keyof UserProfile["notifications"]) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Success",
      description: "Notification settings have been saved.",
    });
  };

  const [notificationTexts, setNotificationTexts] = useState({
    all: "",
    payment: "",
    moderation: "",
    clicksFraud: "",
    ddos: ""
  });

  const handleTextChange = (key: keyof typeof notificationTexts, value: string) => {
    setNotificationTexts(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <main className="w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <header className="flex items-center gap-8 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold">{profile.email}</h1>
        </header>

        <nav className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "info" ? "default" : "ghost"}
            onClick={() => setActiveTab("info")}
            className="gap-2"
          >
            <User className="w-4 h-4" />
            Personal Information
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            onClick={() => setActiveTab("notifications")}
            className="gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </Button>
        </nav>

        <Separator className="mb-6" />

        {activeTab === "info" ? (
          <section className="space-y-6">
            <div className="grid gap-4 w-full max-w-4xl">
              <div className="grid gap-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" value={profile.email} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="created">Date from create account</Label>
                <Input id="created" value={profile.createdAt} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paid">Paid until</Label>
                <Input id="paid" value={profile.paidUntil} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tariff">Active tariff</Label>
                <Input id="tariff" value={profile.activeTariff} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="campaigns">Number of created campaigns</Label>
                <Input id="campaigns" value={profile.campaignsCount.toString()} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clicks">Clicks Used</Label>
                <Input id="clicks" value={profile.clicksUsed.toString()} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {profile.timeZone}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search time zone..." />
                      <CommandEmpty>No time zone found.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {timeZones.map((timezone) => (
                          <CommandItem
                            key={timezone}
                            onSelect={() => handleTimeZoneChange(timezone)}
                          >
                            {timezone}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input 
                  id="telegram"
                  value={profile.telegram} 
                  onChange={handleTelegramChange}
                  placeholder="Enter your Telegram handle"
                />
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6 w-full max-w-4xl">
            <p className="text-muted-foreground">
              In order to get notifications go to @PalladiumNotificationBot. Type /start and hit "Subscribe" button.
            </p>
            
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your notification preferences or additional notes here..."
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="all-notif" className="w-40">All Notification</Label>
                <Input
                  id="all-notif"
                  value={notificationTexts.all}
                  onChange={(e) => handleTextChange("all", e.target.value)}
                  placeholder="Add note..."
                  className="w-64"
                />
                <Switch
                  checked={profile.notifications.all}
                  onCheckedChange={() => handleNotificationChange("all")}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="payment-notif" className="w-40">Payment Notification</Label>
                <Input
                  id="payment-notif"
                  value={notificationTexts.payment}
                  onChange={(e) => handleTextChange("payment", e.target.value)}
                  placeholder="Add note..."
                  className="w-64"
                />
                <Switch
                  checked={profile.notifications.payment}
                  onCheckedChange={() => handleNotificationChange("payment")}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="moderation-notif" className="w-40">Moderation Notification</Label>
                <Input
                  id="moderation-notif"
                  value={notificationTexts.moderation}
                  onChange={(e) => handleTextChange("moderation", e.target.value)}
                  placeholder="Add note..."
                  className="w-64"
                />
                <Switch
                  checked={profile.notifications.moderation}
                  onCheckedChange={() => handleNotificationChange("moderation")}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="fraud-notif" className="w-40">Clicks Fraud</Label>
                <Input
                  id="fraud-notif"
                  value={notificationTexts.clicksFraud}
                  onChange={(e) => handleTextChange("clicksFraud", e.target.value)}
                  placeholder="Add note..."
                  className="w-64"
                />
                <Switch
                  checked={profile.notifications.clicksFraud}
                  onCheckedChange={() => handleNotificationChange("clicksFraud")}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="ddos-notif" className="w-40">DDoS</Label>
                <Input
                  id="ddos-notif"
                  value={notificationTexts.ddos}
                  onChange={(e) => handleTextChange("ddos", e.target.value)}
                  placeholder="Add note..."
                  className="w-64"
                />
                <Switch
                  checked={profile.notifications.ddos}
                  onCheckedChange={() => handleNotificationChange("ddos")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveNotifications}>
                Save
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
