import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChurnLineChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

export function ChurnLineChart({ data, title = 'Churn Rate Over Time' }: ChurnLineChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Churn Rate',
        data: data.values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
}
