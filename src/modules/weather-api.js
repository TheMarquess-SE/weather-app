const API_KEY = "H2SKW3EZ4PS469UHPXM2JWW7F";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const getWeather = async (location) => {
  const url = `${BASE_URL}${location}/?key=${API_KEY}`;
  const weatherResponse = await fetch(url, { mode: "cors" });
  if (!weatherResponse.ok) {
    throw new Error(
      `Weather data not found. Status: ${weatherResponse.status}`
    );
  }
  const weatherData = await weatherResponse.json();
  return weatherData;
};
