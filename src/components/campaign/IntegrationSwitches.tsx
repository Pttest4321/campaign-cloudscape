
import { Switch } from "@/components/ui/switch";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface IntegrationSwitchesProps {
  isReverseIntegration: boolean;
  setIsReverseIntegration: (value: boolean) => void;
  isBlockIntegration: boolean;
  setIsBlockIntegration: (value: boolean) => void;
  passingLabels?: boolean;
  setPassingLabels?: (value: boolean) => void;
}

export const IntegrationSwitches = ({
  isReverseIntegration,
  setIsReverseIntegration,
  isBlockIntegration,
  setIsBlockIntegration,
  passingLabels = false,
  setPassingLabels,
}: IntegrationSwitchesProps) => {
  const handlePassingLabelsChange = (checked: boolean) => {
    if (setPassingLabels) {
      setPassingLabels(checked);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="flex items-center justify-between">
        <FormLabel htmlFor="reverse-integration">Reverse Integration</FormLabel>
        <Switch
          id="reverse-integration"
          checked={isReverseIntegration}
          onCheckedChange={setIsReverseIntegration}
        />
      </div>

      <div className="flex items-center justify-between">
        <FormLabel htmlFor="block-integration">Block Integration</FormLabel>
        <Switch
          id="block-integration"
          checked={isBlockIntegration}
          onCheckedChange={setIsBlockIntegration}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="passing-labels">Passing labels</Label>
        <Switch
          id="passing-labels"
          checked={passingLabels}
          onCheckedChange={handlePassingLabelsChange}
        />
      </div>
    </div>
  );
};
