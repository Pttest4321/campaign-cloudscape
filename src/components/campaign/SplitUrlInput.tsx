
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SplitUrl } from "@/types/campaign";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SplitUrlInputProps {
  splitUrls: SplitUrl[];
  groupName?: string;
  onGroupNameChange?: (value: string) => void;
  onSplitUrlChange: (index: number, value: string) => void;
  onSplitPercentageChange: (index: number, value: string) => void;
  onAddSplitUrl: () => void;
  onDeleteSplitUrl: (index: number) => void;
  showTabs?: boolean;
}

export const SplitUrlInput = ({
  splitUrls,
  groupName,
  onGroupNameChange,
  onSplitUrlChange,
  onSplitPercentageChange,
  onAddSplitUrl,
  onDeleteSplitUrl,
  showTabs = false,
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
      {groupName !== undefined && onGroupNameChange && (
        <div className="mb-2">
          <Input
            value={groupName}
            onChange={(e) => onGroupNameChange(e.target.value)}
            placeholder="Split Group 1"
          />
        </div>
      )}
      
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
      
      {showTabs && (
        <Tabs defaultValue="iframe" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 tabs-list">
            <TabsTrigger value="iframe">iFrame</TabsTrigger>
            <TabsTrigger value="redirect">Redirect</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};
