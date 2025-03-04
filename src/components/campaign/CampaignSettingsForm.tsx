
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Globe, Target, Users, Tag } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { useState } from "react";

interface CampaignSettingsFormProps {
  isReverseIntegration: boolean;
  setIsReverseIntegration: (value: boolean) => void;
  isBlockIntegration: boolean;
  setIsBlockIntegration: (value: boolean) => void;
}

const tagOptions: Option[] = [
  { label: "Tag 1", value: "tag1" },
  { label: "Tag 2", value: "tag2" },
  { label: "Tag 3", value: "tag3" },
  { label: "Performance", value: "performance" },
  { label: "Awareness", value: "awareness" },
];

export const CampaignSettingsForm = ({
  isReverseIntegration,
  setIsReverseIntegration,
  isBlockIntegration,
  setIsBlockIntegration,
}: CampaignSettingsFormProps) => {
  const form = useFormContext();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Campaign Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter campaign name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Target geolocation <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Globe className="h-4 w-4 inline mr-2" />
                Language (optional)
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                Tags
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={tagOptions}
                  selected={selectedTags}
                  onChange={setSelectedTags}
                  placeholder="Select tags"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
          <FormLabel>Passing labels</FormLabel>
          <Switch />
        </div>
      </div>
    </div>
  );
};
