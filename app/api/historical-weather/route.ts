import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // You'll need to implement this with a weather API that provides historical data
  // This is a mock implementation
  const historicalData = Array.from({ length: 10 }, (_, i) => ({
    year: new Date().getFullYear() - (9 - i),
    avgTemp: 20 + Math.random() * 2 - 1, // Mock data
  }));

  return NextResponse.json(historicalData);
}