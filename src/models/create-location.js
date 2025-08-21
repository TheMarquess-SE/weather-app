import createDay from './create-day';
import createHour from './create-hour';

export default function createLocation(raw) {
  const {
    currentConditions: rawCurrentConditions,
    days: rawDays,
    alerts: rawAlerts,
    timezone: timeZone,
    address: rawAddress,
    latitude,
    longitude,
    resolvedAddress,
    description,
    tzoffset,
  } = raw;

  const currentConditions = createHour({ ...rawCurrentConditions, hourIndex: -1, dayIndex: -1 });
  const days = rawDays.map((d, dayIndex) => createDay({ ...d, dayIndex }));
  let alerts = [];
  if (rawAlerts.length > 0) {
    alerts = rawAlerts.map((a) => ({
      title: a.event,
      description: `${a.headline} ${a.description}`,
    }));
  } else {
    alerts = [
      {
        title: 'No Active Alerts',
        description: 'No alerts at this time, safe and sound.',
      },
    ];
  }

  const address = resolvedAddress.split(',')[0];

  const location = {
    rawAddress,
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
