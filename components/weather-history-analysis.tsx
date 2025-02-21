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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

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
  year: number;
  avgTemp: number;
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
    labels: historicalData.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: historicalData.map(d => d.avgTemp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        text: 'Temperature Trend Over Years'
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

  const firstYear = data[0].avgTemp;
  const lastYear = data[data.length - 1].avgTemp;
  const difference = lastYear - firstYear;
  const yearsSpan = data[data.length - 1].year - data[0].year;
  const changePerYear = difference / yearsSpan;

  if (Math.abs(changePerYear) < 0.1) {
    return 'Temperature has remained relatively stable over this period.';
  } else if (changePerYear > 0) {
    return `Temperature shows a warming trend of approximately ${changePerYear.toFixed(2)}°C per year.`;
  } else {
    return `Temperature shows a cooling trend of approximately ${Math.abs(changePerYear).toFixed(2)}°C per year.`;
  }
}