import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<"info" | "updates">("info");
  
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
  const [notificationTexts, setNotificationTexts] = useState({
    all: "",
    payment: "",
    moderation: "",
    clicksFraud: "",
    ddos: ""
  });

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

  const handleTextChange = (key: keyof typeof notificationTexts, value: string) => {
    setNotificationTexts(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <main className="flex w-full min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-8">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {profile.email}
              </h1>
              <p className="text-sm text-muted-foreground">
                Member since {profile.createdAt}
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger 
                value="info"
                className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4"
              >
                Personal Information
              </TabsTrigger>
              <TabsTrigger 
                value="updates"
                className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4"
              >
                Updates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6 space-y-6">
              <div className="grid gap-4 w-full max-w-4xl">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.email}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="created">Date from create account</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.createdAt}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paid">Paid until</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.paidUntil}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tariff">Active tariff</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.activeTariff}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="campaigns">Number of created campaigns</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.campaignsCount}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clicks">Clicks Used</Label>
                  <span className="px-3 py-2 text-base md:text-sm">{profile.clicksUsed}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Input 
                    id="timezone"
                    value={profile.timeZone} 
                    onChange={(e) => handleTimeZoneChange(e.target.value)}
                  />
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
            </TabsContent>

            <TabsContent value="updates" className="mt-6 space-y-6">
              <div className="space-y-4">
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
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <Label htmlFor={`${key}-notif`} className="w-40 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} Notification
                      </Label>
                      <Input
                        id={`${key}-notif`}
                        value={notificationTexts[key as keyof typeof notificationTexts]}
                        onChange={(e) => handleTextChange(key as keyof typeof notificationTexts, e.target.value)}
                        placeholder="Add note..."
                        className="w-64"
                      />
                      <Switch
                        checked={value}
                        onCheckedChange={() => handleNotificationChange(key as keyof UserProfile["notifications"])}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    Save
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}