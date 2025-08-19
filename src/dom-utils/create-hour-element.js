import formatTime from '../utils/format-time';
import { createEl } from './dom-utils';

export default function createHourElement(hour, timeZone, isToday) {
  const { precipProb, dateTime, icon, temp } = hour;

  const time = formatTime(dateTime, timeZone);
  // do not display precipProb if < 14
  const precipProbContent = precipProb > 14 ? `${precipProb}%` : '';

  const timeEl = createEl('p', { textContent: isToday ? 'Now' : time });
  const iconEl = createEl('i', { className: `fa-solid ${icon}` });
  const precipProbEl = createEl('p', { textContent: precipProbContent });
  const tempEl = createEl('p', { textContent: `${temp}°` });

  const hourEl = createEl('div', { className: 'weather-hour' }, [
    timeEl,
    createEl('div', { className: 'weather-hour-icon-precprob' }, [iconEl, precipProbEl]),
    tempEl,
  ]);

  return hourEl;
}
