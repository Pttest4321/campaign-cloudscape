
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { SplitUrl, CampaignLogicType } from "@/types/campaign";
import { SplitUrlInput } from "./SplitUrlInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface TargetUrlSectionProps {
  selectedLogic: CampaignLogicType;
  splitUrls: SplitUrl[];
  onSplitUrlChange: (index: number, value: string) => void;
  onSplitPercentageChange: (index: number, value: string) => void;
  onAddSplitUrl: () => void;
  onDeleteSplitUrl: (index: number) => void;
}

export const TargetUrlSection = ({
  selectedLogic,
  splitUrls,
  onSplitUrlChange,
  onSplitPercentageChange,
  onAddSplitUrl,
  onDeleteSplitUrl,
}: TargetUrlSectionProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="target_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              {selectedLogic === 'split' ? 'Split URLs' : 'Link to the target page'}
            </FormLabel>
            {selectedLogic === 'split' ? (
              <SplitUrlInput
                splitUrls={splitUrls}
                onSplitUrlChange={onSplitUrlChange}
                onSplitPercentageChange={onSplitPercentageChange}
                onAddSplitUrl={onAddSplitUrl}
                onDeleteSplitUrl={onDeleteSplitUrl}
              />
            ) : (
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Enter target URL (e.g. https://offer.com/)"
                />
              </FormControl>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
