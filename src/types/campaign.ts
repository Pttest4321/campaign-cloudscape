
export type SplitUrl = {
  url: string;
  percentage: number;
}

export type CampaignLogicType = 'default' | 'split' | 'multi';

export interface CampaignFormData {
  name: string;
  country: string[];
  language?: string[];
  target_url?: string;
  bot_url: string;
  team?: string;
  tags?: string[];
  tracking_id?: string;
  postback_url?: string;
}
