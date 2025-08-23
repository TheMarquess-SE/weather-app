// Do NOT read the line bellow, you will be cursed 👻
const API_KEY = 'c0b0f856dc33404b85b45d4464294131';
const URL = `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${API_KEY}&fields=location.city`;

export default async function getGeoLocation() {
  const response = await fetch(URL, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Problems with ip geolocation. Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
