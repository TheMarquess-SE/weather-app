import { TZDate } from '@date-fns/tz';
import { createEl } from './dom-utils';
import getTempColor from '../utils/get-temp-color';

export default function createDayElement(
  { tempMax, tempMin, precipProb, icon, dateTime, index },
  globalMax,
  globalMin,
  units,
) {
  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
  };
  const dayOfWeek = days[new TZDate(dateTime * 1000).getDay().toString()];

  const range = globalMax - globalMin;

  const leftPosition = ((tempMin - globalMin) / range) * 100;
  const width = ((tempMax - tempMin) / range) * 100;

  // Generate a dynamic linear gradient for the marker
  const startColor = getTempColor(tempMin, globalMin, globalMax, units);
  const endColor = getTempColor(tempMax, globalMin, globalMax, units);
  const gradientStyle = `linear-gradient(to right, ${startColor}, ${endColor})`;

  // Create the temperature meter marker
  const tempMeterMarker = createEl('div', {
    className: 'temp-meter-marker',
    style: `left: ${leftPosition}%; width: ${width}%; background: ${gradientStyle};`,
  });

  // Create the temperature meter container
  const tempMeterContainer = createEl(
    'div',
    {
      className: 'temp-meter-container',
    },
    [tempMeterMarker],
  );

  // Create the min-max day container
  const minMaxDayContainer = createEl(
    'div',
    {
      className: 'min-max-day-container',
    },
    [
      createEl('p', { textContent: `${tempMin}°` }, []),
      tempMeterContainer,
      createEl('p', { textContent: `${tempMax}°` }, []),
    ],
  );

  // Create the main day element
  const dayEl = createEl(
    'div',
    {
      className: 'weather-day',
    },
    [
      createEl('p', { textContent: dayOfWeek }, []),
      createEl('div', { className: 'precipProb-container' }, [
        createEl('i', {
          className: `fa-solid ${icon}`,
        }),
        createEl(
          'p',
          {
            textContent: precipProb > 14 ? `${precipProb}%` : '',
            className: `day-precip-prob ${precipProb > 14 ? '' : 'hidden'}`,
          },
          [],
        ),
      ]),

      minMaxDayContainer,
    ],
  );

  dayEl.dataset.dayIndex = index;

  return dayEl;
}
