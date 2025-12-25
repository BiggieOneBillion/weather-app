import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHERAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Weather API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch historical data for the last 7 days
    const historicalData = [];
    const today = new Date();
    
    for (let i = 7; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon}&dt=${dateStr}`,
        { next: { revalidate: 86400 } } // Cache for 24 hours
      );

      if (!response.ok) {
        console.error(`Failed to fetch data for ${dateStr}:`, response.status);
        continue;
      }

      const data = await response.json();
      
      if (data.forecast?.forecastday?.[0]) {
        const dayData = data.forecast.forecastday[0];
        historicalData.push({
          date: dateStr,
          year: date.getFullYear(),
          avgTemp: dayData.day.avgtemp_c,
          maxTemp: dayData.day.maxtemp_c,
          minTemp: dayData.day.mintemp_c,
          condition: dayData.day.condition.text,
          precipitation: dayData.day.totalprecip_mm,
          humidity: dayData.day.avghumidity,
        });
      }
    }

    return NextResponse.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical weather data' },
      { status: 500 }
    );
  }
}