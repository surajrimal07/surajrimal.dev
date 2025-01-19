import type { WeatherApiResponse, WeatherResponse } from '@/types/weather';
import { NextResponse } from 'next/server';

const DEV_IP = '110.44.115.214';

const locationAPI = process.env.IP2LOCATION_API_KEY;

const weatherAPI = process.env.WEATHER_API_KEY;
if (!weatherAPI) {
  throw new Error('WEATHER_API_KEY is not defined');
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    let ip: string;
    if (process.env.NODE_ENV === 'development') {
      ip = DEV_IP;
    } else {
      const forwardedFor = request.headers.get('x-forwarded-for');
      ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    }

    const locationResponse = await fetch(
      `https://api.ip2location.io/?key=${locationAPI}&ip=${ip}&format=json`,
      {
        next: { revalidate: 86400 },
      },
    );

    const locationData = await locationResponse.json();

    const city =
      locationData.city_name !== '-' ? locationData.city_name : 'London';

    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${city}&aqi=no`,
      {
        next: { revalidate: 3600 },
      },
    );

    const weatherData: WeatherResponse = await weatherResponse.json();

    const { temp_c, condition } = weatherData.current;
    const { text, icon } = condition;

    const response: WeatherApiResponse = {
      city: city,
      temperature: temp_c,
      condition: text,
      icon: icon,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching weather data' },
      { status: 500 },
    );
  }
}
