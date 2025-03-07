import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SplitUrl } from "@/types/campaign";

interface SplitUrlInputProps {
  splitUrls: SplitUrl[];
  onSplitUrlChange: (index: number, value: string) => void;
  onSplitPercentageChange: (index: number, value: string) => void;
  onAddSplitUrl: () => void;
  onDeleteSplitUrl: (index: number) => void;
}

export const SplitUrlInput = ({
  splitUrls,
  onSplitUrlChange,
  onSplitPercentageChange,
  onAddSplitUrl,
  onDeleteSplitUrl,
}: SplitUrlInputProps) => {
  const handleAddSplitUrl = () => {
    if (splitUrls.length >= 10) return;
    
    const newPercentage = Math.floor(100 / (splitUrls.length + 1));
    const remainingPercentage = 100 - newPercentage;
    
    // Distribute remaining percentage among existing URLs
    const distributedPercentage = Math.floor(remainingPercentage / splitUrls.length);
    splitUrls.forEach((_, index) => {
      onSplitPercentageChange(index, distributedPercentage.toString());
    });
    
    onAddSplitUrl();
  };

  return (
    <div className="space-y-4">
      {splitUrls.map((splitUrl, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Input
              value={splitUrl.url}
              onChange={(e) => onSplitUrlChange(index, e.target.value)}
              placeholder="Enter target URL"
              type="url"
              pattern="https?://.+"
            />
            {index === 0 && splitUrls.length < 10 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddSplitUrl}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="w-24">
            <Input
              value={splitUrl.percentage}
              onChange={(e) => onSplitPercentageChange(index, e.target.value)}
              type="number"
              min="0"
              max="100"
            />
          </div>
          <div className="w-8 text-sm">%</div>
          {index !== 0 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onDeleteSplitUrl(index)}
              className="flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};