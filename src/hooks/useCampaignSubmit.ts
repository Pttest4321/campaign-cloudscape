
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CampaignFormData } from "@/types/campaign";

export const useCampaignSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitCampaign = async (data: CampaignFormData, options: {
    selectedLogic: string,
    splitUrls: { url: string, percentage: number }[]
  }) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("User not authenticated");

      const campaignData = {
        id: crypto.randomUUID(),
        user_id: userId,
        name: data.name,
        country: data.country,
        language: data.language,
        website_url: options.selectedLogic === 'split' ? null : data.target_url,
        offer_url: data.bot_url,
        status: 'active',
        split_urls: options.selectedLogic === 'split' ? options.splitUrls : [],
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

  return { submitCampaign };
};
