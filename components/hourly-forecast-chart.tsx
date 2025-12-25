"use client";

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
  Filler,
} from 'chart.js';
import { Card } from '@/components/ui/card';
import { Cloud, Droplets, Wind } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HourlyData {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  chance_of_rain: number;
  chance_of_snow: number;
}

interface HourlyForecastChartProps {
  hourlyData: HourlyData[];
}

export function HourlyForecastChart({ hourlyData }: HourlyForecastChartProps) {
  // Get next 24 hours
  const next24Hours = hourlyData.slice(0, 24);

  const chartData = {
    labels: next24Hours.map(hour => {
      const time = new Date(hour.time);
      return time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    }),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: next24Hours.map(hour => hour.temp_c),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Rain Chance (%)',
        data: next24Hours.map(hour => hour.chance_of_rain),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: '24-Hour Forecast',
        font: {
          size: 16,
        },
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const index = context.dataIndex;
            const condition = next24Hours[index].condition.text;
            return `Condition: ${condition}`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Rain Chance (%)',
        },
        grid: {
          drawOnChartArea: false,
        },
        max: 100,
      },
    },
  };

  // Calculate summary stats
  const avgTemp = next24Hours.reduce((sum, h) => sum + h.temp_c, 0) / next24Hours.length;
  const maxTemp = Math.max(...next24Hours.map(h => h.temp_c));
  const minTemp = Math.min(...next24Hours.map(h => h.temp_c));
  const maxRainChance = Math.max(...next24Hours.map(h => h.chance_of_rain));

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Cloud className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Avg Temp</p>
              <p className="text-lg font-semibold">{avgTemp.toFixed(1)}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Wind className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">High</p>
              <p className="text-lg font-semibold">{maxTemp.toFixed(1)}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Wind className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Low</p>
              <p className="text-lg font-semibold">{minTemp.toFixed(1)}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Droplets className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-muted-foreground">Max Rain</p>
              <p className="text-lg font-semibold">{maxRainChance}%</p>
            </div>
          </div>
        </div>

        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Card>
  );
}
