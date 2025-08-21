import { TZDate } from '@date-fns/tz';
import formatAddress from '../../utils/format-address';
import { formatTextualDate } from '../../utils/format-time';

export default function summary() {
  let locationEl;
  let conditionsEl;
  let tempEl;
  let tempMaxEl;
  let tempMinEl;
  let dateEl;

  function init(refs) {
    ({ locationEl, conditionsEl, tempEl, tempMaxEl, tempMinEl, dateEl } = refs);
  }

  function update(location, temp, condition, maxTemp, minTemp, hourDateTime, timeZone) {
    const tzHourDt = new TZDate(hourDateTime * 1000, timeZone);
    locationEl.textContent = formatAddress(location);
    dateEl.textContent = formatTextualDate(tzHourDt);
    tempEl.textContent = `${temp}°`;
    conditionsEl.textContent = condition;
    tempMaxEl.textContent = `${maxTemp}°`;
    tempMinEl.textContent = `${minTemp}°`;
  }

  return {
    init,
    update,
  };
}
