interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  description 
}: MetricCardProps) {
  const isPositive = change ? change >= 0 : null;
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      
      {change !== undefined && (
        <div className="mt-2 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          {description && (
            <span className="ml-2 text-sm text-gray-500">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
