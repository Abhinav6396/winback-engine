import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "@radix-ui/react-icons";

interface Reason {
  label: string;
  delta: number;
}

interface HealthScoreCardProps {
  score: number;
  tier: string;
  reasons: Reason[];
}

export function HealthScoreCard({ score, tier, reasons }: HealthScoreCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Health Score</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-3xl font-semibold">{score}</p>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getTierColor(tier)}`}>
              {tier}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-500">Change this month</p>
          <div className="flex items-center justify-end">
            {score >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm font-medium ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(score)}%
            </span>
          </div>
        </div>
      </div>

      {reasons && reasons.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-500">Key factors</h4>
          <div className="space-y-2">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{reason.label}</span>
                <div className="flex items-center">
                  {reason.delta > 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : reason.delta < 0 ? (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  ) : (
                    <MinusIcon className="h-4 w-4 text-gray-400" />
                  )}
                  <span 
                    className={`ml-1 text-sm ${reason.delta > 0 ? 'text-green-600' : reason.delta < 0 ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    {Math.abs(reason.delta)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
