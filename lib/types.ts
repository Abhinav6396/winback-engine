// Original Member interface is now updated below with the new HealthTier type
// Campaign related types
export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  type: 'email' | 'push' | 'sms' | 'in_app';
  targetSegment?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  metrics?: CampaignMetrics;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  bounceRate: number;
  openRate: number;
  clickThroughRate: number;
  conversionRate: number;
}

// Exit Survey related types
export interface ExitSurvey {
  id: string;
  memberId: string;
  reason: string;
  feedback: string;
  rating: number;
  submittedAt: string;
  metadata?: Record<string, any>;
}

// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form related types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'radio';
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: any;
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    validate?: (value: any) => string | boolean;
  };
}

// Health and Dashboard related types
export type HealthTier = "healthy" | "at_risk" | "critical" | "churned";

export interface DashboardMetrics {
  churnRate: number;
  atRiskCount: number;
  avgHealthScore: number;
  revenueSaved: number;
}

export interface ChurnTrendPoint {
  month: string; // e.g., '2025-05'
  churnPct: number;
}

export interface HealthDistribution {
  healthy: number;
  at_risk: number;
  critical: number;
}

export interface ExitSurveyReason {
  reason: string;
  count: number;
}

// Update Member interface to use HealthTier
export interface MemberActivity {
  action: string;
  timestamp: string;
  details?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  health_score?: number;
  healthScore?: number;
  lifetime_value: number;
  next_renewal_date?: string | null;
  last_login_at?: string | null;
  last_seen?: string;
  joined_at: string;
  last_active: string;
  plan?: string;
  status: HealthTier;
  activity?: MemberActivity[];
  metadata?: Record<string, any>;
}

// UI related types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppConfig {
  theme: {
    mode: ThemeMode;
    primaryColor: string;
    secondaryColor: string;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
  };
  version: string;
}
