
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  country: z.array(z.string()).min(1, "At least one country is required"),
  language: z.array(z.string()).optional(),
  target_url: z.string().url("Please enter a valid URL").optional(),
  bot_url: z.string().min(1, "Bot URL is required"),
  team: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
