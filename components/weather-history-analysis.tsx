import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Card } from '@/components/ui/card';


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

// Register additional ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalData {
  date: string;
  year: number;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  condition: string;
  precipitation: number;
  humidity: number;
}

export function WeatherHistoryAnalysis({ lat, lon, locationName }: { 
  lat: number; 
  lon: number;
  locationName: string;
}) {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [trend, setTrend] = useState<string>('');
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch historical data
    const fetchHistoricalData = async () => {
      try {
        // You'll need to implement this API endpoint
        const response = await fetch(`/api/historical-weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();
        setHistoricalData(data);
        
        // Calculate temperature trend
        const trend = calculateTrend(data);
        setTrend(trend);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      } 
    //   finally {
    //     // setLoading(false);
    //   }
    };

    fetchHistoricalData();
  }, [lat, lon]);

  const chartCommonData = {
    labels: historicalData.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: historicalData.map(d => d.avgTemp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Max Temperature (°C)',
        data: historicalData.map(d => d.maxTemp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Min Temperature (°C)',
        data: historicalData.map(d => d.minTemp),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '7-Day Temperature History'
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Card className="p-6">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Historical Temperature Analysis</h3>
          {/* <Button onClick={generatePDF} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button> */}
        </div>
        
        <div className="grid gap-20 md:grid-cols-2 md:gap-4">
          <div className="h-[300px]">
            <h4 className="text-sm font-medium mb-2">Line Chart View</h4>
            <Line 
              data={chartCommonData}
              options={chartOptions}
            />
          </div>
          
          <div className="h-[300px]">
            <h4 className="text-sm font-medium mb-2">Bar Chart View</h4>
            <Bar 
              data={chartCommonData}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="mp-10">
          <h4 className="font-medium">Analysis</h4>
          <p className="text-sm text-muted-foreground">{trend}</p>
        </div>
      </div>
    </Card>
  );
}

function calculateTrend(data: HistoricalData[]): string {
  if (data.length < 2) return 'Insufficient data for trend analysis';

  const firstDay = data[0].avgTemp;
  const lastDay = data[data.length - 1].avgTemp;
  const difference = lastDay - firstDay;
  const avgTemp = data.reduce((sum, d) => sum + d.avgTemp, 0) / data.length;
  const avgPrecip = data.reduce((sum, d) => sum + d.precipitation, 0) / data.length;

  let analysis = `Over the past 7 days, the average temperature was ${avgTemp.toFixed(1)}°C. `;
  
  if (Math.abs(difference) < 1) {
    analysis += 'Temperatures have remained relatively stable. ';
  } else if (difference > 0) {
    analysis += `Temperatures have increased by ${difference.toFixed(1)}°C from the start of the week. `;
  } else {
    analysis += `Temperatures have decreased by ${Math.abs(difference).toFixed(1)}°C from the start of the week. `;
  }

  if (avgPrecip > 5) {
    analysis += `There was significant precipitation averaging ${avgPrecip.toFixed(1)}mm per day.`;
  } else if (avgPrecip > 0) {
    analysis += `Light precipitation was recorded, averaging ${avgPrecip.toFixed(1)}mm per day.`;
  } else {
    analysis += 'No precipitation was recorded during this period.';
  }

  return analysis;
}