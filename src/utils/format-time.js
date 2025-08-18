import { TZDate } from '@date-fns/tz';

export default function formatTime(time, timeZone) {
  const timeTz = new TZDate(time * 1000, timeZone);
  const hours = timeTz.getHours();
  let formatedTime = '';

  if (hours === 0) {
    formatedTime += '12';
    formatedTime += ' a.m.';
  } else if (hours < 12) {
    formatedTime += hours;
    formatedTime += ' a.m.';
  } else if (hours === 12) {
    formatedTime += '12';
    formatedTime += ' p.m.';
  } else {
    formatedTime += hours - 12;
    formatedTime += ' p.m.';
  }
  return formatedTime;
}
