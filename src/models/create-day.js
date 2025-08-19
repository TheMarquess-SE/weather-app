import mapIcon from '../utils/map-icon';
import createHour from './create-hour';

export default function createDay(raw) {
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
    precipcover: rawPrecipCover,
    tempmax: rawTempMax,
    tempmin: rawTempMin,
    visibility: rawVisibility,
    aqius: airQuality,
    uvindex: uvIndex,
    snowdepth: snowDepth,
    moonphase: moonPhase,
    datetimeEpoch: dateTime,
    sunriseEpoch: sunrise,
    sunsetEpoch: sunset,
    pressure: rawPressure,
    hours: rawHours,
    icon,
    conditions,
    snow,
    description,
    dayIndex: index,
  } = raw;

  const mappedIcon = mapIcon(icon);
  const hours = rawHours.map((hourData, hourIndex) =>
    createHour({ ...hourData, hourIndex, dayIndex: index }),
  );

  const dew = Math.round(rawDew ?? 0);
  const feelsLike = Math.round(rawFeelsLike ?? 0);
  const humidity = Math.round(rawHumidity ?? 0);
  const temp = Math.round(rawTemp ?? 0);
  const tempMax = Math.round(rawTempMax ?? 0);
  const tempMin = Math.round(rawTempMin ?? 0);
  const precipProb = Math.round(rawPrecipProb ?? 0);
  const precip = Number((rawPrecip ?? 0).toFixed(2));
  const windGust = Math.round(rawWindGust ?? 0);
  const windSpeed = Math.round(rawWindSpeed ?? 0);
  const windDir = Math.round(rawWindDir ?? 0);
  const precipCover = Math.round(rawPrecipCover ?? 0);
  const pressure = Math.round(rawPressure ?? 0);
  const visibility = Math.round(rawVisibility ?? 0);

  const day = {
    dateTime,
    conditions,
    description,
    airQuality,
    uvIndex,
    dew,
    humidity,
    pressure,
    feelsLike,
    temp,
    tempMax,
    tempMin,
    precipProb,
    precip,
    precipCover,
    windDir,
    windGust,
    windSpeed,
    visibility,
    moonPhase,
    sunrise,
    sunset,
    snow,
    snowDepth,
    hours,
    icon: mappedIcon,
    index,
  };

  return {
    ...day,
    self: () => day,
  };
}
