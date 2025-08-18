import mapIcon from '../utils/map-icon';

export default function createHour(raw) {
  const {
    dew: rawDew,
    feelslike: rawFeelsLike,
    humidity: rawHumidity,
    precip: rawPrecip,
    precipprob: rawPrecipProb,
    temp: rawTemp,
    windgust: rawWindGust,
    windspeed: rawWindSpeed,
    winddir: rawWindDir,
    visibility: rawVisibility,
    aqius: airQuality,
    uvindex: uvIndex,
    snowdepth: snowDepth,
    datetimeEpoch: dateTime,
    sunriseEpoch: sunrise,
    sunsetEpoch: sunset,
    icon,
    pressure,
    conditions,
    snow,
  } = raw;

  const mappedIcon = mapIcon(icon);
  const dew = Math.round(rawDew ?? 0);
  const feelsLike = Math.round(rawFeelsLike ?? 0);
  const humidity = Math.round(rawHumidity ?? 0);
  const temp = Math.round(rawTemp ?? 0);
  const precipProb = Math.round(rawPrecipProb ?? 0);
  const windGust = Math.round(rawWindGust ?? 0);
  const windSpeed = Math.round(rawWindSpeed ?? 0);
  const visibility = Math.round(rawVisibility ?? 0);
  const windDir = Math.round(rawWindDir ?? 0);
  const precip = Number((rawPrecip ?? 0).toFixed(2));

  const hour = {
    dateTime,
    airQuality,
    conditions,
    dew,
    feelsLike,
    humidity,
    pressure,
    precip,
    precipProb,
    temp,
    uvIndex,
    visibility,
    windDir,
    windGust,
    windSpeed,
    snow,
    snowDepth,
    sunrise,
    sunset,
    icon: mappedIcon,
  };

  return {
    ...hour,
    self: () => hour,
  };
}
