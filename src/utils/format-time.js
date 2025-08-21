import { TZDate } from '@date-fns/tz';

const days = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tues',
  3: 'Wed',
  4: 'Thurs',
  5: 'Fri',
  6: 'Sat',
};

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

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

export function formatTimeShort(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  let formatedTime = '';
  if (hours === 0) {
    formatedTime += `12:00 a.m`;
  } else if (hours <= 12) {
    formatedTime += hours;
    if (minutes.toString().length === 1) {
      formatedTime += `:0${minutes} a.m.`;
    } else {
      formatedTime += `:${minutes} a.m.`;
    }
  } else {
    formatedTime += hours - 12;
    if (minutes.toString().length === 1) {
      formatedTime += `:0${minutes} p.m.`;
    } else {
      formatedTime += `:${minutes} p.m.`;
    }
  }
  return formatedTime;
}

export function formatTextualDate(dateTime) {
  const month = months[dateTime.getMonth()];
  const day = days[dateTime.getDay()];
  const date = dateTime.getDate();

  return `${day} ${month} ${date} ${formatTimeShort(dateTime)}`;
}
