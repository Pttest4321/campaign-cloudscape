
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema } from "@/schemas/campaign";
import { CampaignLogicType, SplitUrl, CampaignFormData } from "@/types/campaign";
import { Form } from "@/components/ui/form";
import { CampaignSettingsForm } from "@/components/campaign/CampaignSettingsForm";
import { CampaignLogicSelector } from "@/components/campaign/CampaignLogicSelector";
import { TargetUrlSection } from "@/components/campaign/TargetUrlSection";
import { BotUrlSection } from "@/components/campaign/BotUrlSection";
import { TeamSelector } from "@/components/campaign/TeamSelector";
import { CampaignFormActions } from "@/components/campaign/CampaignFormActions";

export default function NewCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<CampaignLogicType>('default');
  const [splitUrls, setSplitUrls] = useState<SplitUrl[]>([{ url: '', percentage: 100 }]);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      country: "",
      language: "",
      target_url: "",
      bot_url: "",
      team: "",
    },
  });

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

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("User not authenticated");

      const campaignData = {
        id: crypto.randomUUID(),
        user_id: userId,
        name: data.name,
        country: data.country,
        language: data.language,
        website_url: selectedLogic === 'split' ? null : data.target_url,
        offer_url: data.bot_url,
        status: 'active',
        split_urls: selectedLogic === 'split' ? splitUrls : [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      localStorage.setItem('campaigns', JSON.stringify([...existingCampaigns, campaignData]));

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CampaignSettingsForm
            isReverseIntegration={isReverseIntegration}
            setIsReverseIntegration={setIsReverseIntegration}
            isBlockIntegration={isBlockIntegration}
            setIsBlockIntegration={setIsBlockIntegration}
          />

          <CampaignLogicSelector 
            selectedLogic={selectedLogic}
            onLogicChange={setSelectedLogic}
          />

          <TargetUrlSection
            selectedLogic={selectedLogic}
            splitUrls={splitUrls}
            onSplitUrlChange={handleSplitUrlChange}
            onSplitPercentageChange={handleSplitPercentageChange}
            onAddSplitUrl={handleAddSplitUrl}
            onDeleteSplitUrl={handleDeleteSplitUrl}
          />

          <BotUrlSection />

          <TeamSelector />

          <CampaignFormActions />
        </form>
      </Form>
    </div>
  );
}
