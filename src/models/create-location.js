import createDay from './create-day';
import createHour from './create-hour';

export default function createLocation(raw) {
  const {
    currentConditions: rawCurrentConditions,
    days: rawDays,
    alerts: rawAlerts,
    timezone: timeZone,
    latitude,
    longitude,
    resolvedAddress,
    address,
    description,
    tzoffset,
  } = raw;

  const currentConditions = createHour(rawCurrentConditions);
  const days = rawDays.map((d) => createDay(d));
  const alerts = rawAlerts.map((a) => ({
    title: a.event,
    description: `${a.headline} ${a.description}`,
  }));

  const location = {
    address,
    resolvedAddress,
    longitude,
    latitude,
    timeZone,
    tzoffset,
    alerts,
    description,
    currentConditions,
    days,
  };

  return {
    ...location,
    self: () => location,
  };
}
