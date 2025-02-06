
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
import { Globe, Link, Plus, Target, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { TablesInsert, Json } from "@/integrations/supabase/types";

type SplitUrl = {
  [key: string]: string | number;
  url: string;
  percentage: number;
}

export default function NewCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<'default' | 'split' | 'multi'>('default');
  const [splitUrls, setSplitUrls] = useState<SplitUrl[]>([{ url: '', percentage: 100 }]);

  const handleAddSplitUrl = () => {
    if (splitUrls.length >= 10) return; // Limit to 10 splits
    const currentTotal = splitUrls.reduce((sum, url) => sum + url.percentage, 0);
    const newPercentage = Math.floor(currentTotal / (splitUrls.length + 1));
    
    // Redistribute percentages
    const updatedUrls = splitUrls.map(url => ({
      ...url,
      percentage: newPercentage
    }));
    
    // Add new URL with remaining percentage
    const remaining = 100 - (newPercentage * splitUrls.length);
    updatedUrls.push({ url: '', percentage: remaining });
    
    setSplitUrls(updatedUrls);
  };

  const handleSplitUrlChange = (index: number, value: string) => {
    const newUrls = [...splitUrls];
    newUrls[index].url = value;
    setSplitUrls(newUrls);
  };

  const handleSplitPercentageChange = (index: number, value: string) => {
    const percentage = Math.min(100, Math.max(0, parseInt(value) || 0));
    const newUrls = [...splitUrls];
    newUrls[index].percentage = percentage;
    
    // Adjust other percentages proportionally
    const total = newUrls.reduce((sum, url, i) => i === index ? sum : sum + url.percentage, 0);
    if (total + percentage > 100) {
      const factor = (100 - percentage) / total;
      newUrls.forEach((url, i) => {
        if (i !== index) {
          url.percentage = Math.floor(url.percentage * factor);
        }
      });
    }
    
    setSplitUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not authenticated");

      const campaignData: TablesInsert<'campaigns'> = {
        user_id: user.id,
        name: formData.get('name') as string,
        country: formData.get('country') as string,
        language: formData.get('language') as string,
        website_url: selectedLogic === 'split' ? null : formData.get('target_url') as string,
        offer_url: formData.get('bot_url') as string,
        status: 'active',
        split_urls: selectedLogic === 'split' ? splitUrls as unknown as Json : []
      };

      const { error } = await supabase
        .from('campaigns')
        .insert(campaignData);

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
              {selectedLogic === 'split' ? 'Split URLs' : 'Link to the target page'}
            </Label>
            {selectedLogic === 'split' ? (
              <div className="space-y-4">
                {splitUrls.map((splitUrl, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="flex-1">
                      <Input
                        value={splitUrl.url}
                        onChange={(e) => handleSplitUrlChange(index, e.target.value)}
                        placeholder="Enter target URL"
                        type="url"
                        pattern="https?://.+"
                      />
                    </div>
                    <div className="w-24">
                      <Input
                        value={splitUrl.percentage}
                        onChange={(e) => handleSplitPercentageChange(index, e.target.value)}
                        type="number"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="w-8 text-sm">%</div>
                    {index === splitUrls.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAddSplitUrl}
                        className="flex-shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Input
                id="target_url"
                name="target_url"
                type="url"
                placeholder="Enter target URL (e.g. https://offer.com/)"
                pattern="https?://.+"
              />
            )}
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
