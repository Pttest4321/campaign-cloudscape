
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  country: z.string().min(1, "Country is required"),
  language: z.string().optional(),
  target_url: z.string().url("Please enter a valid URL").optional(),
  bot_url: z.string().min(1, "Bot URL is required"),
  team: z.string().optional(),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
