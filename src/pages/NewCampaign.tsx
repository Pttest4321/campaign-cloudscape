
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
import { useToast } from "@/components/ui/use-toast";
import { Link, Users } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { TablesInsert } from "@/integrations/supabase/types";
import { SplitUrlInput } from "@/components/campaign/SplitUrlInput";
import { CampaignSettingsForm } from "@/components/campaign/CampaignSettingsForm";
import { CampaignLogicType, SplitUrl } from "@/types/campaign";

export default function NewCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<CampaignLogicType>('default');
  const [splitUrls, setSplitUrls] = useState<SplitUrl[]>([{ url: '', percentage: 100 }]);

  const handleAddSplitUrl = () => {
    if (splitUrls.length >= 10) return;
    const newPercentage = Math.floor(100 / (splitUrls.length + 1));
    
    const updatedUrls = splitUrls.map(url => ({
      ...url,
      percentage: newPercentage
    }));
    
    updatedUrls.push({ url: '', percentage: newPercentage });
    
    const totalPercentage = updatedUrls.reduce((sum, url) => sum + url.percentage, 0);
    if (totalPercentage < 100) {
      updatedUrls[updatedUrls.length - 1].percentage += (100 - totalPercentage);
    }
    
    setSplitUrls(updatedUrls);
  };

  const handleDeleteSplitUrl = (index: number) => {
    if (splitUrls.length <= 1) return;
    
    const newUrls = splitUrls.filter((_, i) => i !== index);
    const evenPercentage = Math.floor(100 / newUrls.length);
    
    const updatedUrls = newUrls.map((url, i) => ({
      ...url,
      percentage: i === newUrls.length - 1 
        ? 100 - (evenPercentage * (newUrls.length - 1))
        : evenPercentage
    }));
    
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
        split_urls: selectedLogic === 'split' ? splitUrls : []
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
        <CampaignSettingsForm
          isReverseIntegration={isReverseIntegration}
          setIsReverseIntegration={setIsReverseIntegration}
          isBlockIntegration={isBlockIntegration}
          setIsBlockIntegration={setIsBlockIntegration}
        />

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
            <SplitUrlInput
              splitUrls={splitUrls}
              onSplitUrlChange={handleSplitUrlChange}
              onSplitPercentageChange={handleSplitPercentageChange}
              onAddSplitUrl={handleAddSplitUrl}
              onDeleteSplitUrl={handleDeleteSplitUrl}
            />
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
