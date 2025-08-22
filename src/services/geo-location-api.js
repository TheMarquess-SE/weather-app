export default async function getGeoLocation() {
  const BASE_URL = 'http://ip-api.com/json/?fields=status,message,city,query';
  const response = await fetch(BASE_URL, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Problems with ip geolocation. Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
