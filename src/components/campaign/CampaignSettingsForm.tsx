
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Globe, Link, Target, Users } from "lucide-react";

interface CampaignSettingsFormProps {
  isReverseIntegration: boolean;
  setIsReverseIntegration: (value: boolean) => void;
  isBlockIntegration: boolean;
  setIsBlockIntegration: (value: boolean) => void;
}

export const CampaignSettingsForm = ({
  isReverseIntegration,
  setIsReverseIntegration,
  isBlockIntegration,
  setIsBlockIntegration,
}: CampaignSettingsFormProps) => {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-1">
          Campaign Name <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Enter campaign name"
          required 
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            Target geolocation <span className="text-red-500">*</span>
          </Label>
          <Select name="country" required>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">
            <Globe className="h-4 w-4 inline mr-2" />
            Language (optional)
          </Label>
          <Select name="language">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tag">Tag Select</Label>
          <Select name="tag">
            <SelectTrigger>
              <SelectValue placeholder="Select tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tag1">Tag 1</SelectItem>
              <SelectItem value="tag2">Tag 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="reverse-integration">Reverse Integration</Label>
          <Switch
            id="reverse-integration"
            checked={isReverseIntegration}
            onCheckedChange={setIsReverseIntegration}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="block-integration">Block Integration</Label>
          <Switch
            id="block-integration"
            checked={isBlockIntegration}
            onCheckedChange={setIsBlockIntegration}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Passing labels</Label>
          <Switch />
        </div>
      </div>
    </div>
  );
};
