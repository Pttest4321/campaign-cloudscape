import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Link, Users, Plus, Trash2, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplitUrlInput } from "@/components/campaign/SplitUrlInput";
import { CampaignSettingsForm } from "@/components/campaign/CampaignSettingsForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema } from "@/schemas/campaign";
import { CampaignLogicType, SplitUrl, CampaignFormData } from "@/types/campaign";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function NewCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isReverseIntegration, setIsReverseIntegration] = useState(false);
  const [isBlockIntegration, setIsBlockIntegration] = useState(false);
  const [selectedLogic, setSelectedLogic] = useState<CampaignLogicType>('default');
  const [splitUrls, setSplitUrls] = useState<SplitUrl[]>([{ url: '', percentage: 100 }]);
  const [splitGroups, setSplitGroups] = useState<Array<{name: string, urls: SplitUrl[]}>>([
    { name: 'Split Group 1', urls: [{ url: '', percentage: 100 }] }
  ]);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      country: [],
      language: [],
      target_url: "",
      bot_url: "",
      team: "",
      tags: [],
      tracking_id: "",
      postback_url: "",
    },
  });

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

  const handleAddSplitGroup = () => {
    setSplitGroups([
      ...splitGroups,
      { name: `Split Group ${splitGroups.length + 1}`, urls: [{ url: '', percentage: 100 }] }
    ]);
  };

  const handleUpdateSplitGroupName = (index: number, name: string) => {
    const newGroups = [...splitGroups];
    newGroups[index].name = name;
    setSplitGroups(newGroups);
  };

  const handleDeleteSplitGroup = (indexToDelete: number) => {
    setSplitGroups(splitGroups.filter((_, index) => index !== indexToDelete));
  };

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("User not authenticated");

      const campaignData = {
        id: crypto.randomUUID(),
        user_id: userId,
        name: data.name,
        country: data.country,
        language: data.language,
        website_url: selectedLogic === 'split' ? null : data.target_url,
        offer_url: data.bot_url,
        status: 'active',
        split_urls: selectedLogic === 'split' ? splitUrls : [],
        tags: data.tags,
        tracking_id: data.tracking_id,
        postback_url: data.postback_url,
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

  return (
    <div className="space-y-6 fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold">Settings for campaign</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Campaign Settings */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium mb-4">Campaign Details</h2>
            <CampaignSettingsForm
              isReverseIntegration={isReverseIntegration}
              setIsReverseIntegration={setIsReverseIntegration}
              isBlockIntegration={isBlockIntegration}
              setIsBlockIntegration={setIsBlockIntegration}
            />
            
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Campaign Logic Type</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={selectedLogic === 'default' ? 'default' : 'outline'}
                  onClick={() => setSelectedLogic('default')}
                  className="w-full"
                >
                  Default Logic
                </Button>
                <Button
                  type="button"
                  variant={selectedLogic === 'split' ? 'default' : 'outline'}
                  onClick={() => setSelectedLogic('split')}
                  className="w-full"
                >
                  Split logic
                </Button>
                <Button
                  type="button"
                  variant={selectedLogic === 'multi' ? 'default' : 'outline'}
                  onClick={() => setSelectedLogic('multi')}
                  className="w-full"
                >
                  Split multi logic
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2: Target URL */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium mb-4">Target URL Configuration</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="target_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Default settings for target link <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="Enter target URL (e.g. https://offer.com/)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs defaultValue="iframe" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="iframe">iFrame</TabsTrigger>
                  <TabsTrigger value="redirect">Redirect</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
                <TabsContent value="iframe">
                  {/* iFrame specific settings will go here */}
                </TabsContent>
                <TabsContent value="redirect">
                  {/* Redirect specific settings will go here */}
                </TabsContent>
                <TabsContent value="content">
                  {/* Content specific settings will go here */}
                </TabsContent>
              </Tabs>
                  
              {selectedLogic === 'multi' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Split settings for target link:</h3>
                  {splitGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Input
                          value={group.name}
                          onChange={(e) => handleUpdateSplitGroupName(groupIndex, e.target.value)}
                          className="max-w-xs"
                        />
                        <div className="flex gap-2">
                          {groupIndex === 0 ? (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddSplitGroup}
                                className="w-full"
                              >
                                <Plus className="h-4 w-4" />
                                Add New
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const lastGroup = splitGroups[splitGroups.length - 1];
                                  setSplitGroups([...splitGroups, { ...lastGroup, name: `Split Group ${splitGroups.length + 1}` }]);
                                }}
                                className="w-full"
                              >
                                <Copy className="h-4 w-4" />
                                Duplicate
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const lastGroup = splitGroups[splitGroups.length - 1];
                                  setSplitGroups([...splitGroups, { ...lastGroup, name: `Split Group ${splitGroups.length + 1}` }]);
                                }}
                                className="w-full"
                              >
                                <Copy className="h-4 w-4" />
                                Duplicate
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleDeleteSplitGroup(splitGroups.length - 1)}
                                className="w-full text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <SplitUrlInput
                        splitUrls={group.urls}
                        onSplitUrlChange={(index, value) => {
                          const newGroups = [...splitGroups];
                          newGroups[groupIndex].urls[index].url = value;
                          setSplitGroups(newGroups);
                        }}
                        onSplitPercentageChange={(index, value) => {
                          const newGroups = [...splitGroups];
                          newGroups[groupIndex].urls[index].percentage = parseInt(value) || 0;
                          setSplitGroups(newGroups);
                        }}
                        onAddSplitUrl={() => {
                          const newGroups = [...splitGroups];
                          newGroups[groupIndex].urls.push({ url: '', percentage: 0 });
                          setSplitGroups(newGroups);
                        }}
                        onDeleteSplitUrl={(index) => {
                          const newGroups = [...splitGroups];
                          newGroups[groupIndex].urls = newGroups[groupIndex].urls.filter((_, i) => i !== index);
                          setSplitGroups(newGroups);
                        }}
                      />

                      <Tabs defaultValue="iframe" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="iframe">iFrame</TabsTrigger>
                          <TabsTrigger value="redirect">Redirect</TabsTrigger>
                          <TabsTrigger value="content">Content</TabsTrigger>
                        </TabsList>
                        <TabsContent value="iframe">
                          {/* iFrame specific settings will go here */}
                        </TabsContent>
                        <TabsContent value="redirect">
                          {/* Redirect specific settings will go here */}
                        </TabsContent>
                        <TabsContent value="content">
                          {/* Content specific settings will go here */}
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSplitGroup}
                    className="w-full"
                  >
                    Add Split Group
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Bot URL */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium mb-4">Bot Configuration</h2>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="bot_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Link for bots
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="redirect.php" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 4: Team Users */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium mb-4">Team Configuration</h2>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Users
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Select or enter team members" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 5: Tracking Parameters */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium mb-4">Tracking Configuration</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tracking_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      To track conversions, specify the PP (partner program) click identifier. For example: clickid, subid, etc
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter tracking ID" />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground mt-2">
                      Postback link [POST/GET]: https://api.example.expert/v1/postback
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/campaigns')}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
