import { TZDate } from '@date-fns/tz';

export default function fetchAndFillHours(todayHours, tomorrowHours, now, timeZone) {
  // Current hours must be 24h from current time
  let hours = [];
  const currentTime = new TZDate(now, timeZone);
  const currentHour = currentTime.getHours();

  // Find index of current hour
  const startIndex = todayHours.findIndex((hour) => {
    const adjustedHour = new TZDate(hour.dateTime * 1000, timeZone);

    if (adjustedHour.getHours() === currentHour) {
      return true;
    }
    return false;
  });

  // Extract hours from start index to end of day
  hours = todayHours.slice(startIndex);

  // Add remaining hours from the following day
  if (hours.length < 24) {
    const remainingHours = 24 - hours.length;

    for (let i = 0; i < remainingHours; i += 1) {
      hours.push(tomorrowHours[i]);
    }
  }

  return hours;
}
