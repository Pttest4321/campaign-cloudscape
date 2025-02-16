import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    // Here you would typically save to your backend
    toast({
      title: "Success",
      description: "Notification settings have been saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center gap-8 mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.email}</h1>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
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
      </div>

      <Separator className="mb-6" />

      {activeTab === "info" ? (
        <div className="space-y-6">
          <div className="grid gap-4 max-w-2xl">
            <div className="grid gap-2">
              <Label>E-Mail</Label>
              <Input value={profile.email} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Date from create account</Label>
              <Input value={profile.createdAt} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Paid until</Label>
              <Input value={profile.paidUntil} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Active tariff</Label>
              <Input value={profile.activeTariff} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Number of created campaigns</Label>
              <Input value={profile.campaignsCount.toString()} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Clicks Used</Label>
              <Input value={profile.clicksUsed.toString()} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Time Zone</Label>
              <Input value={profile.timeZone} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Telegram</Label>
              <Input value={profile.telegram} readOnly />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            In order to get notifications go to @PalladiumNotificationBot. Type /start and hit "Subscribe" button.
          </p>
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>All Notification</Label>
              </div>
              <Switch
                checked={profile.notifications.all}
                onCheckedChange={() => handleNotificationChange("all")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Notification</Label>
              </div>
              <Switch
                checked={profile.notifications.payment}
                onCheckedChange={() => handleNotificationChange("payment")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Moderation Notification</Label>
              </div>
              <Switch
                checked={profile.notifications.moderation}
                onCheckedChange={() => handleNotificationChange("moderation")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Clicks Fraud</Label>
              </div>
              <Switch
                checked={profile.notifications.clicksFraud}
                onCheckedChange={() => handleNotificationChange("clicksFraud")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>DDoS</Label>
              </div>
              <Switch
                checked={profile.notifications.ddos}
                onCheckedChange={() => handleNotificationChange("ddos")}
              />
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={handleSaveNotifications}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}