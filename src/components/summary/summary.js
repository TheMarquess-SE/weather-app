import formatAddress from '../../utils/format-address';

export default function summary() {
  let locationEl;
  let conditionsEl;
  let tempEl;
  let tempMaxEl;
  let tempMinEl;

  function init(refs) {
    ({ locationEl, conditionsEl, tempEl, tempMaxEl, tempMinEl } = refs);
  }

  function updateLocation(location, temp, condition, maxTemp, minTemp) {
    locationEl.textContent = formatAddress(location);
    tempEl.textContent = `${temp}°`;
    conditionsEl.textContent = condition;
    tempMaxEl.textContent = `${maxTemp}°`;
    tempMinEl.textContent = `${minTemp}°`;
  }

  function updateHour(temp, condition) {
    tempEl.textContent = `${temp}°`;
    conditionsEl.textContent = condition;
  }

  function updateDay(temp, condition, maxTemp, minTemp) {
    tempEl.textContent = `${temp}°`;
    conditionsEl.textContent = condition;
    tempMaxEl.textContent = `${maxTemp}°`;
    tempMinEl.textContent = `${minTemp}°`;
  }

  return {
    init,
    updateLocation,
    updateHour,
    updateDay,
  };
}
