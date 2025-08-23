// Do NOT read the line bellow, you will be cursed 👻
const API_KEY = 'H2SKW3EZ4PS469UHPXM2JWW7F';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export default async function fetchWeather(location) {
  const url = `${BASE_URL}${location}/?key=${API_KEY}&contentType=json&elements=%2Baqius`;
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Weather data not found. Status: ${response.status}`);
  }
  const weatherRawData = await response.json();
  return weatherRawData;
}
