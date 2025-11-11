import { DashboardMetrics, HealthDistribution, ChurnTrendPoint } from './types';

interface DashboardData {
  metrics: DashboardMetrics;
  distribution: HealthDistribution;
  churnTrend: ChurnTrendPoint[];
}

export async function getDashboard(): Promise<DashboardData> {
  await new Promise(r => setTimeout(r, 200)); // Simulate network delay
  
  return {
    metrics: {
      churnRate: 0.084,
      atRiskCount: 27,
      avgHealthScore: 67,
      revenueSaved: 1240,
    },
    distribution: {
      healthy: 120,
      at_risk: 45,
      critical: 19,
    },
    churnTrend: [
      { month: "Jun", churnPct: 0.12 },
      { month: "Jul", churnPct: 0.11 },
      { month: "Aug", churnPct: 0.10 },
      { month: "Sep", churnPct: 0.09 },
      { month: "Oct", churnPct: 0.084 },
    ],
  };
}
