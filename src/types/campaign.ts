
export type SplitUrl = {
  [key: string]: string | number;
  url: string;
  percentage: number;
}

export type CampaignLogicType = 'default' | 'split' | 'multi';
