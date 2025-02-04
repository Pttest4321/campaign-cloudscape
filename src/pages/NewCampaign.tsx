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
import { useToast } from "@/components/ui/use-toast";
import { Globe, Link, Target, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function NewCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<'default' | 'split' | 'multi'>('default');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from('campaigns').insert({
        user_id: user.id,
        name: formData.get('name'),
        country: formData.get('country'),
        language: formData.get('language'),
        website_url: formData.get('target_url'),
        offer_url: formData.get('bot_url'),
        status: 'active'
      });

      if (error) throw error;

      toast({
        title: "Campaign created",
        description: "Your campaign has been successfully created.",
      });
      
      navigate('/campaigns');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold">Settings for campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={selectedLogic === 'default' ? 'default' : 'outline'}
                onClick={() => setSelectedLogic('default')}
                className="w-full"
              >
                Default Logic
              </Button>
              <Button
                type="button"
                variant={selectedLogic === 'split' ? 'default' : 'outline'}
                onClick={() => setSelectedLogic('split')}
                className="w-full"
              >
                Split logic
              </Button>
              <Button
                type="button"
                variant={selectedLogic === 'multi' ? 'default' : 'outline'}
                onClick={() => setSelectedLogic('multi')}
                className="w-full"
              >
                Split multi logic
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Link to the target page
            </Label>
            <Input
              id="target_url"
              name="target_url"
              type="url"
              placeholder="Enter target URL (e.g. https://offer.com/)"
              pattern="https?://.+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bot_url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Link for bots
            </Label>
            <Input
              id="bot_url"
              name="bot_url"
              placeholder="redirect.php"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Users
            </Label>
            <Select name="team">
              <SelectTrigger>
                <SelectValue placeholder="Select team members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team1">Team 1</SelectItem>
                <SelectItem value="team2">Team 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/campaigns')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
