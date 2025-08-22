// demo-location.js
import createLocation from '../models/create-location';

// Helpers
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => min + Math.random() * (max - min);
const round = (n) => Math.round(n);
const toSec = (ms) => Math.floor(ms / 1000);

const pickIconAndConditions = (tempF, precipIn, cloudiness) => {
  if (precipIn > 0.15) return { icon: 'rain', conditions: 'Rain' };
  if (cloudiness > 0.7) return { icon: 'cloudy', conditions: 'Cloudy' };
  if (cloudiness > 0.4) return { icon: 'partly-cloudy-day', conditions: 'Partly Cloudy' };
  return { icon: 'clear-day', conditions: 'Clear' };
};

export default function createDemoLocation({
  address = 'Wakanda',
  latitude = 30.3322,
  longitude = -81.6557,
  resolvedAddress = 'Wakanda, FL, USA',
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
} = {}) {
  const now = new Date();
  const tzOffsetHours = -now.getTimezoneOffset() / 60;
  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const baseDayTempF = 82;
  const dailySwingF = 12;
  const hourlyNoiseF = 2.5;
  const basePressureMb = 1015;
  const baseHumidity = 60;
  const baseWindMph = 8;

  const sunriseHour = 6;
  const sunsetHour = 20;

  const rawDays = Array.from({ length: 15 }, (_, dIdx) => {
    const dayStart = new Date(todayMidnight.getTime() + dIdx * 24 * 3600 * 1000);
    const dayTrend = Math.sin((dIdx / 7) * Math.PI * 2);
    const dayTempBias = dayTrend * 3;
    const dayPressureBias = dayTrend * -4;
    const dayHumidityBias = dayTrend * 8;

    // eslint-disable-next-line no-shadow
    const rawHours = Array.from({ length: 24 }, (_, hIdx) => {
      const t = new Date(dayStart.getTime() + hIdx * 3600 * 1000);
      const dayFrac = (hIdx / 24) * Math.PI * 2;
      const diurnal = Math.sin(dayFrac - Math.PI / 2);

      const temp =
        baseDayTempF + dayTempBias + diurnal * dailySwingF + rand(-hourlyNoiseF, hourlyNoiseF);

      const feelslike = temp + rand(-1.5, 1.5);
      const humidity = clamp(
        round(baseHumidity + dayHumidityBias + diurnal * 10 + rand(-5, 5)),
        20,
        100,
      );
      const dew = round(temp - (100 - humidity) / 5);
      const windspeed = clamp(
        round(baseWindMph + rand(-3, 6) + (1 - Math.cos(dayFrac)) * 2),
        0,
        28,
      );
      const windgust = windspeed + round(rand(0, 10));
      const winddir = round(rand(0, 359));
      const visibility = clamp(round(10 + rand(-2, 2) - (humidity - 50) / 30), 1, 10);
      const pressure = clamp(round(basePressureMb + dayPressureBias + rand(-3, 3)), 980, 1040);
      const uvindex = clamp(
        round(
          Math.max(
            0,
            Math.sin(((hIdx - sunriseHour) / (sunsetHour - sunriseHour)) * Math.PI) * 10 +
              rand(-1, 1),
          ),
        ),
        0,
        11,
      );
      const aqius = clamp(round(45 + rand(-15, 35)), 5, 160);

      const precipprob = clamp(
        round(Math.sin(((hIdx - 12) / 12) * Math.PI) * 40 + 30 + dayTrend * 20 + rand(-20, 20)),
        0,
        100,
      );
      const precip = precipprob > 60 ? Number(rand(0.0, 0.3).toFixed(2)) : 0;
      const snow = 0;
      const snowdepth = 0;
      const cloudiness = clamp((humidity / 100) * 0.6 + (0.5 - Math.abs(diurnal) / 2), 0, 1);
      const { icon, conditions } = pickIconAndConditions(temp, precip, cloudiness);

      return {
        dew,
        feelslike,
        humidity,
        precip,
        precipprob,
        temp,
        windgust,
        windspeed,
        winddir,
        visibility,
        aqius,
        uvindex,
        snowdepth,
        datetimeEpoch: toSec(t.getTime()),
        sunriseEpoch: toSec(new Date(dayStart.getTime() + sunriseHour * 3600 * 1000).getTime()),
        sunsetEpoch: toSec(new Date(dayStart.getTime() + sunsetHour * 3600 * 1000).getTime()),
        pressure,
        icon,
        conditions,
        snow,
      };
    });

    const temps = rawHours.map((h) => h.temp);
    const tempmax = round(Math.max(...temps));
    const tempmin = round(Math.min(...temps));
    const tempAvg = temps.reduce((a, b) => a + b, 0) / temps.length;
    const precipTotal = Number(rawHours.reduce((a, h) => a + h.precip, 0).toFixed(2));
    const precipHours = rawHours.filter((h) => h.precip > 0).length;
    const precipcover = round((precipHours / 24) * 100);
    const humidityAvg = round(rawHours.reduce((a, h) => a + h.humidity, 0) / 24);
    const pressureAvg = round(rawHours.reduce((a, h) => a + h.pressure, 0) / 24);
    const visibilityAvg = round(rawHours.reduce((a, h) => a + h.visibility, 0) / 24);
    const uvMax = Math.max(...rawHours.map((h) => h.uvindex));
    const aqiusAvg = round(rawHours.reduce((a, h) => a + h.aqius, 0) / 24);

    const moonphase = (dIdx % 29) / 29;

    const conditionCounts = rawHours.reduce((m, h) => {
      const copy = { ...m };
      copy[h.conditions] = (copy[h.conditions] || 0) + 1;
      return copy;
    }, {});

    const topCond = Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Clear';
    const dayIcon = rawHours.find((h) => h.conditions === topCond)?.icon || 'clear-day';

    return {
      dew: round(tempAvg - (100 - humidityAvg) / 5),
      feelslike: round(tempAvg),
      humidity: humidityAvg,
      precip: precipTotal,
      precipprob: round(rawHours.reduce((a, h) => a + h.precipprob, 0) / 24),
      temp: round(tempAvg),
      windgust: round(Math.max(...rawHours.map((h) => h.windgust))),
      windspeed: round(rawHours.reduce((a, h) => a + h.windspeed, 0) / 24),
      winddir: round(rawHours.reduce((a, h) => a + h.winddir, 0) / 24),
      precipcover,
      tempmax,
      tempmin,
      visibility: visibilityAvg,
      aqius: aqiusAvg,
      uvindex: uvMax,
      snowdepth: 0,
      moonphase,
      datetimeEpoch: toSec(dayStart.getTime()),
      sunriseEpoch: toSec(new Date(dayStart.getTime() + sunriseHour * 3600 * 1000).getTime()),
      sunsetEpoch: toSec(new Date(dayStart.getTime() + sunsetHour * 3600 * 1000).getTime()),
      pressure: pressureAvg,
      hours: rawHours,
      icon: dayIcon,
      conditions: topCond,
      snow: 0,
      description: `${topCond}. High ${tempmax}°F / Low ${tempmin}°F. Precip ${precipTotal}"`,
    };
  });

  const todayHours = rawDays[0].hours;
  const currentHourIdx = clamp(new Date().getHours(), 0, 23);
  const currentHour = todayHours[currentHourIdx];

  const raw = {
    currentConditions: {
      ...currentHour,
      hourIndex: -1,
      dayIndex: -1,
    },
    days: rawDays.map((d, dayIndex) => ({ ...d, dayIndex })),
    alerts: [],
    timezone,
    address,
    latitude,
    longitude,
    resolvedAddress,
    description: 'Demo forecast generated locally.',
    tzoffset: tzOffsetHours,
  };

  return createLocation(raw);
}
