export type Language = 'es' | 'pt';

export type GoalCategoryId =
  | 'product'
  | 'community'
  | 'course'
  | 'business'
  | 'brand'
  | 'education';

export type TimelineOption = '7d' | '30d' | '90d';

export type ExperienceLevel = 'beginner' | 'basics' | 'experienced';

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ExerciseOption = 'A' | 'B' | 'C';

// Multichannel content types
export type ContentChannel = 'linkedin' | 'discord' | 'newsletter' | 'instagram' | 'email';

export interface MultichannelContent {
  channel: ContentChannel;
  content: string;
  tone: string;
  cta: string;
  format: string;
}

// Editorial calendar types
export interface EditorialCalendarItem {
  date: string;
  channel: ContentChannel;
  topic: string;
  objective: string;
  format: string;
  cta: string;
  status: 'planned' | 'scheduled' | 'published';
}

export interface GoalCardItem {
  id: GoalCategoryId;
  icon: string;
  title: string;
  subtitle: string;
  accent: 'blue' | 'lavender' | 'mint' | 'yellow' | 'pink' | 'emerald';
}

export interface GrowthFormData {
  goalCategory: GoalCategoryId | null;
  targetDescription: string;
  timeline: TimelineOption | null;
  experience: ExperienceLevel | null;
}

export type CurrentAssetId = 
  | 'no_audience'
  | 'social_media'
  | 'community'
  | 'newsletter'
  | 'clients'
  | 'course_product'
  | 'other';

export type MainChallengeId = 
  | 'target_audience'
  | 'differentiation'
  | 'attract'
  | 'engagement'
  | 'content_creation'
  | 'metrics'
  | 'what_to_change'
  | 'other';

export interface DiagnoseFormData {
  audience: string;
  currentAssets: CurrentAssetId[];
  otherAsset?: string;
  mainChallenge: MainChallengeId | null;
  otherChallenge?: string;
  marketingExperience: ExperienceLevel | null;
}

export interface GrowthAIContext {
  audience: string;
  current_assets: string[];
  main_challenge: string;
  marketing_experience: string;
  language: string;
  project_type: string;
  objective: string;
  timeframe: string;
}

export interface BuildFormData {
  problem: string;
  persona: string;
  value: string;
  valueProposition: string;
}

export type ExperimentChannel = 
  | 'linkedin' 
  | 'instagram' 
  | 'email' 
  | 'community' 
  | 'website' 
  | 'other';

export type ExperimentKpi = 
  | 'reach' 
  | 'clicks' 
  | 'signups' 
  | 'engagement' 
  | 'conversions';

export type ExperimentDuration = '7d' | '14d' | '30d';

export interface ExperimentFormData {
  objective: string;
  hypothesis: string;
  channel: ExperimentChannel;
  message: string;
  cta: string;
  kpi: ExperimentKpi;
  baseline: string;
  duration: ExperimentDuration;
}

export interface ExecuteChecklist {
  messageDefined: boolean;
  formatChosen: boolean;
  ctaDefined: boolean;
  kpiDefined: boolean;
  publishDateSet: boolean;
}

export interface ImproveFormData {
  impressions: string;
  clicks: string;
  signups: string;
  engagement: string;
  conversions: string;
  notes: string;
}


