"use client";

import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import type { WeatherResponse } from '@/types/weather';

interface ComparisonChartProps {
  locations: Array<{
    id: string;
    name: string;
    weather: WeatherResponse;
  }>;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export function ComparisonChart({ locations }: ComparisonChartProps) {
  if (locations.length === 0) {
    return null;
  }

  // Prepare data for 7-day forecast comparison
  const days = locations[0].weather.forecast.forecastday.map(day => day.date);
  
  const chartData = days.map((date, index) => {
    const dataPoint: any = { date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
    
    locations.forEach((location) => {
      const dayData = location.weather.forecast.forecastday[index];
      if (dayData) {
        dataPoint[`${location.name}_temp`] = dayData.day.avgtemp_c;
        dataPoint[`${location.name}_rain`] = dayData.day.daily_chance_of_rain;
      }
    });
    
    return dataPoint;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Temperature Comparison (°C)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {locations.map((location, index) => (
              <Line
                key={location.id}
                type="monotone"
                dataKey={`${location.name}_temp`}
                stroke={COLORS[index]}
                name={location.name}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Rain Chance Comparison (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {locations.map((location, index) => (
              <Line
                key={location.id}
                type="monotone"
                dataKey={`${location.name}_rain`}
                stroke={COLORS[index]}
                name={location.name}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
