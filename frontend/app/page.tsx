import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  return null;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle: string;
}

function MetricCard({ label, value, subtitle }: MetricCardProps) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}

interface DistributionProps {
  healthy: number;
  at_risk: number;
  critical: number;
}

interface HealthDistributionChartProps {
  distribution: DistributionProps;
}

function HealthDistributionChart({ distribution }: HealthDistributionChartProps) {
  return (
    <div className="border p-6 rounded-xl bg-white">
      <h3 className="text-lg font-medium mb-4">Member Health Distribution</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Healthy</span>
          <span className="font-medium">{distribution.healthy}%</span>
        </div>
        <div className="flex justify-between">
          <span>At Risk</span>
          <span className="font-medium">{distribution.at_risk}%</span>
        </div>
        <div className="flex justify-between">
          <span>Critical</span>
          <span className="font-medium">{distribution.critical}%</span>
        </div>
      </div>
    </div>
  );
}

interface ChurnTrendData {
  month: string;
  churnPct: number;
}

interface ChurnTrendChartProps {
  data: ChurnTrendData[];
}

function ChurnTrendChart({ data }: ChurnTrendChartProps) {
  return (
    <div className="border p-6 rounded-xl bg-white">
      <h3 className="text-lg font-medium mb-4">Churn Trend</h3>
      <div className="h-64 flex items-center justify-center text-sm text-gray-500">
        {/* You can implement the actual chart here using the data prop */}
        Chart will be displayed here with data: {data.length} data points
      </div>
    </div>
  );
}

