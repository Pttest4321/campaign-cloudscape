
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema } from "@/schemas/campaign";
import { CampaignLogicType, CampaignFormData } from "@/types/campaign";
import { Form } from "@/components/ui/form";
import { CampaignSettingsForm } from "@/components/campaign/CampaignSettingsForm";
import { CampaignLogicSelector } from "@/components/campaign/CampaignLogicSelector";
import { TargetUrlSection } from "@/components/campaign/TargetUrlSection";
import { BotUrlSection } from "@/components/campaign/BotUrlSection";
import { TeamSelector } from "@/components/campaign/TeamSelector";
import { CampaignFormActions } from "@/components/campaign/CampaignFormActions";
import { useSplitUrls } from "@/hooks/useSplitUrls";
import { useCampaignSubmit } from "@/hooks/useCampaignSubmit";

export default function NewCampaign() {
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<CampaignLogicType>('default');
  
  const { 
    splitUrls, 
    handleAddSplitUrl, 
    handleDeleteSplitUrl,
    handleSplitUrlChange,
    handleSplitPercentageChange
  } = useSplitUrls();
  
  const { submitCampaign } = useCampaignSubmit();

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

  const onSubmit = async (data: CampaignFormData) => {
    await submitCampaign(data, { selectedLogic, splitUrls });
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
