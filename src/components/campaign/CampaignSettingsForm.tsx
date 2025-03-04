
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
import { Globe, Plus, Tag, Target, Users, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CampaignSettingsFormProps {
  isReverseIntegration: boolean;
  setIsReverseIntegration: (value: boolean) => void;
  isBlockIntegration: boolean;
  setIsBlockIntegration: (value: boolean) => void;
}

const countries = [
  { value: "all", label: "All Countries" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
  { value: "ru", label: "Russian" },
  { value: "ar", label: "Arabic" },
  { value: "pt", label: "Portuguese" },
];

export const CampaignSettingsForm = ({
  isReverseIntegration,
  setIsReverseIntegration,
  isBlockIntegration,
  setIsBlockIntegration,
}: CampaignSettingsFormProps) => {
  const form = useFormContext();
  const [openCountry, setOpenCountry] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [availableTags, setAvailableTags] = useState([
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
  ]);

  const handleCreateTag = () => {
    if (!newTag.trim()) return;
    
    const tagValue = newTag.toLowerCase().replace(/\s+/g, '-');
    // Check if tag already exists
    if (!availableTags.some(tag => tag.value === tagValue)) {
      const newTagObj = { value: tagValue, label: newTag.trim() };
      setAvailableTags([...availableTags, newTagObj]);
    }
    
    // Add to selected tags
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(tagValue)) {
      form.setValue("tags", [...currentTags, tagValue], { 
        shouldValidate: true,
        shouldDirty: true 
      });
    }
    
    setNewTag("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag) {
      e.preventDefault();
      handleCreateTag();
    }
  };

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
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Target geolocation <span className="text-red-500">*</span>
              </FormLabel>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} countries selected`
                        : "Select countries"}
                      <Target className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search countries..."
                      className="h-9"
                    />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {countries.map((country) => (
                            <CommandItem
                              value={country.value}
                              key={country.value}
                              onSelect={() => {
                                const values = field.value || [];
                                const newValues = values.includes(country.value)
                                  ? values.filter((value) => value !== country.value)
                                  : [...values, country.value];
                                form.setValue("country", newValues, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                  field.value?.includes(country.value)
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <svg
                                  className={cn("h-4 w-4")}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span>{country.label}</span>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {field.value.map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="px-2 py-1"
                    >
                      {countries.find((c) => c.value === value)?.label || value}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const newValues = field.value.filter((v) => v !== value);
                          form.setValue("country", newValues, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                <Globe className="h-4 w-4 inline mr-2" />
                Language (optional)
              </FormLabel>
              <Popover open={openLanguage} onOpenChange={setOpenLanguage}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} languages selected`
                        : "Select languages"}
                      <Globe className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search languages..."
                      className="h-9"
                    />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {languages.map((language) => (
                            <CommandItem
                              value={language.value}
                              key={language.value}
                              onSelect={() => {
                                const values = field.value || [];
                                const newValues = values.includes(language.value)
                                  ? values.filter((value) => value !== language.value)
                                  : [...values, language.value];
                                form.setValue("language", newValues, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                  field.value?.includes(language.value)
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <svg
                                  className={cn("h-4 w-4")}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span>{language.label}</span>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {field.value.map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="px-2 py-1"
                    >
                      {languages.find((l) => l.value === value)?.label || value}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const newValues = field.value.filter((v) => v !== value);
                          form.setValue("language", newValues, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                <Tag className="h-4 w-4 inline mr-2" />
                Tag Select (optional)
              </FormLabel>
              <Popover open={openTag} onOpenChange={setOpenTag}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} tags selected`
                        : "Select or create tags"}
                      <Tag className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <div className="flex items-center border-b p-2">
                      <CommandInput
                        placeholder="Search or create tag..."
                        className="h-9 flex-1"
                        value={newTag}
                        onValueChange={setNewTag}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 ml-1"
                        onClick={handleCreateTag}
                        disabled={!newTag.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <CommandEmpty>
                      {newTag ? "Press enter to create this tag" : "No tags found."}
                    </CommandEmpty>
                    <CommandList>
                      <CommandGroup heading="Available Tags">
                        <ScrollArea className="h-[200px]">
                          {availableTags.map((tag) => (
                            <CommandItem
                              value={tag.value}
                              key={tag.value}
                              onSelect={() => {
                                const values = field.value || [];
                                const newValues = values.includes(tag.value)
                                  ? values.filter((value) => value !== tag.value)
                                  : [...values, tag.value];
                                form.setValue("tags", newValues, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                  field.value?.includes(tag.value)
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <svg
                                  className={cn("h-4 w-4")}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span>{tag.label}</span>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {field.value.map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="px-2 py-1"
                    >
                      {availableTags.find((t) => t.value === value)?.label || value}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => {
                          const newValues = field.value.filter((v) => v !== value);
                          form.setValue("tags", newValues, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
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
