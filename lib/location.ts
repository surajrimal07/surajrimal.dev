'use server';

export async function getCountryName(ipAddress: string) {
  if (!ipAddress) return '';

  const locationAPI = process.env.IP2LOCATION_API_KEY;


  const locationResponse = await fetch(
    `https://api.ip2location.io/?key=${locationAPI}&ip=${ipAddress}&format=json`,
  );


  const locationData = await locationResponse.json();



  const city =
    locationData.city_name?.length > 0 ? locationData.city_name : 'London';

  const country =
    locationData.country_name?.length > 0 ? locationData.country_name : 'UK';

  console.log(city, country);

  return `${city}, ${country}`;
}
