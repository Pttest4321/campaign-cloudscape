
import { Button } from "@/components/ui/button";
import { CampaignLogicType } from "@/types/campaign";

interface CampaignLogicSelectorProps {
  selectedLogic: CampaignLogicType;
  onLogicChange: (logic: CampaignLogicType) => void;
}

export const CampaignLogicSelector = ({
  selectedLogic,
  onLogicChange,
}: CampaignLogicSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <Button
          type="button"
          variant={selectedLogic === 'default' ? 'default' : 'outline'}
          onClick={() => onLogicChange('default')}
          className="w-full"
        >
          Default Logic
        </Button>
        <Button
          type="button"
          variant={selectedLogic === 'split' ? 'default' : 'outline'}
          onClick={() => onLogicChange('split')}
          className="w-full"
        >
          Split logic
        </Button>
        <Button
          type="button"
          variant={selectedLogic === 'multi' ? 'default' : 'outline'}
          onClick={() => onLogicChange('multi')}
          className="w-full"
        >
          Split multi logic
        </Button>
      </div>
    </div>
  );
};
