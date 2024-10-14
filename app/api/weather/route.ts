import { NextResponse } from 'next/server';

const DEV_IP = '110.44.115.214';

const locationAPI = process.env.IP2LOCATION_API_KEY;

const weatherAPI = process.env.WEATHER_API_KEY!;

export async function GET(request) {
  try {
    let ip: string;
    if (process.env.NODE_ENV === 'development') {
      ip = DEV_IP;
    } else {
      const forwardedFor = request.headers.get('x-forwarded-for');
      ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.ip;
    }

    const locationResponse = await fetch(
      `https://api.ip2location.io/?key=${locationAPI}&ip=${ip}&format=json`
    );
    const locationData = await locationResponse.json();

    const city =
      locationData.city_name !== '-' ? locationData.city_name : 'London';

    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${city}&aqi=no`
    );
    const weatherData = await weatherResponse.json();

    const { temp_c, condition } = weatherData.current;
    const { text, icon } = condition;

    return NextResponse.json({
      city: city,
      temperature: temp_c,
      condition: text,
      icon: icon,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching weather data' },
      { status: 500 }
    );
  }
}
