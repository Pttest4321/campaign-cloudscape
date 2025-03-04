
import { useState } from "react";
import { SplitUrl } from "@/types/campaign";

export const useSplitUrls = (initialUrls: SplitUrl[] = [{ url: '', percentage: 100 }]) => {
  const [splitUrls, setSplitUrls] = useState<SplitUrl[]>(initialUrls);

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

  return {
    splitUrls,
    handleAddSplitUrl,
    handleDeleteSplitUrl,
    handleSplitUrlChange,
    handleSplitPercentageChange
  };
};
