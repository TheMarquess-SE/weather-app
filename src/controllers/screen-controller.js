import summary from '../components/summary/summary';
import alerts from '../components/alerts/alerts';
import wind from '../components/wind/wind';
import uvIndex from '../components/uv-index/uv-index';
import sunrise from '../components/sunrise/sunrise';
import formatUnits from '../utils/format-units';

export default function screenController() {
  const spinnerEl = document.getElementById('spinner-container');
  // Settings
  const openSettingsBtnEl = document.getElementById('settings-btn');
  const closeSettingsBtnEl = document.getElementById('close-units-settings-btn');
  const settingsEl = document.getElementById('units-settings');
  const unitOptionsEls = settingsEl.querySelectorAll('.units-option');

  // create modules
  const format = formatUnits();
  const sum = summary();
  const al = alerts();
  const uv = uvIndex();
  const wn = wind();
  const sr = sunrise();

  function init() {
    // Summary
    sum.init({
      locationEl: document.getElementById('location'),
      tempEl: document.getElementById('current-temperature'),
      conditionsEl: document.getElementById('weather-condition'),
      tempMaxEl: document.getElementById('daily-max-temperature'),
      tempMinEl: document.getElementById('daily-min-temperature'),
    });
    // Alerts
    al.init({
      alertsEl: document.getElementById('alerts-container'),
    });
    // UV Index
    uv.init({
      valueEl: document.getElementById('uv-index-value'),
      levelEl: document.getElementById('uv-index-level'),
      meterEl: document.getElementById('uv-meter-container'),
      markerEl: document.getElementById('uv-meter-marker'),
    });
    // Wind
    wn.init({
      speedEl: document.getElementById('wind-speed-extended'),
      gustsEl: document.getElementById('wind-gusts-extended'),
      directionEl: document.getElementById('wind-direction-extended'),
      arrowEl: document.getElementById('wind-direction-compass-arrow'),
      mainSpeedEl: document.getElementById('wind-speed'),
      mainSpeedUnitsEl: document.getElementById('wind-speed-units'),
    });
    // Sunrise
    sr.init({
      mainEl: document.getElementById('sunrise-sunset-time-current'),
      secondEl: document.getElementById('sunrise-sunset-time-later'),
      titleEl: document.getElementById('sunrise-sunset-title'),
      iconEl: document.getElementById('sunrise-sunset-icon'),
      lineEl: document.getElementById('sunset-line'),
      markerEl: document.getElementById('sunset-marker'),
    });
  }

  function toggleSpinner() {
    spinnerEl.classList.toggle('hidden');
  }

  function toggleSettings() {
    openSettingsBtnEl.classList.toggle('hidden');
    settingsEl.classList.toggle('hidden');
  }

  function bindSearch(processSearch) {
    const searchInputEl = document.getElementById('search-input');
    const searchFormEl = document.getElementById('search-form');

    searchFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const locationQuery = searchInputEl.value.trim();
      processSearch(locationQuery);
    });
  }

  function bindSettings(changeUnits) {
    openSettingsBtnEl.addEventListener('click', toggleSettings);
    closeSettingsBtnEl.addEventListener('click', toggleSettings);
    settingsEl.addEventListener('click', (e) => {
      const selection = e.target.closest('.units-option') || null;
      if (!selection) return;
      changeUnits(selection.dataset.type, selection.dataset.unit);
    });
  }

  function initSettings(units) {
    unitOptionsEls.forEach((optionEl) => {
      if (optionEl.dataset.unit === units[optionEl.dataset.type]) {
        optionEl.classList.add('selected-unit');
      }
    });
  }

  function updateSettings(units) {
    unitOptionsEls.forEach((optionEl) => optionEl.classList.remove('selected-unit'));
    unitOptionsEls.forEach((optionEl) => {
      if (optionEl.dataset.unit === units[optionEl.dataset.type]) {
        optionEl.classList.add('selected-unit');
      }
    });
  }

  function update(state) {
    const { hour, day, location, units } = state;
    const now = Date.now();

    // Summary
    sum.updateLocation(
      location.address,
      format.formatTemp(hour.temp, units.temp),
      hour.conditions,
      format.formatTemp(day.tempMax, units.temp),
      format.formatTemp(day.tempMin, units.temp),
    );
    // Alerts
    al.update(location.alerts);
    // UV Index
    uv.update(hour.uvIndex);
    // Wind
    wn.update(
      format.formatWind(hour.windSpeed, units.wind),
      format.formatWind(hour.windGust, units.wind),
      hour.windDir,
      units.wind,
    );
    // Sunrise
    sr.update(day.sunrise, day.sunset, now, location.timeZone);
  }

  return {
    init,
    initSettings,
    toggleSpinner,
    bindSearch,
    bindSettings,
    updateSettings,
    update,
  };
}
