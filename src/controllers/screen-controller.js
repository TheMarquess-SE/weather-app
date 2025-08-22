import { isSameDay } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import summary from '../components/summary/summary';
import alerts from '../components/alerts/alerts';
import wind from '../components/wind/wind';
import uvIndex from '../components/uv-index/uv-index';
import sunrise from '../components/sunrise/sunrise';
import visibility from '../components/visibility/visibility';
import pressure from '../components/pressure/pressure';
import humidity from '../components/humidity/humidity';
import moonPhase from '../components/moon-phase/moon-phase';
import feelsLike from '../components/feels-like/feels-like';
import airQuality from '../components/air-quality/air-quality';
import precipitation from '../components/precipitation/precipitation';
import hours from '../components/hours/hours';
import days from '../components/days/days';
import formatUnits from '../utils/format-units';
import fetchAndFillHours from '../utils/fetch-fill-hours';

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
  const vs = visibility();
  const ps = pressure();
  const hm = humidity();
  const mp = moonPhase();
  const fl = feelsLike();
  const aq = airQuality();
  const pc = precipitation();
  const h = hours();
  const d = days();

  function init() {
    // Summary
    sum.init({
      locationEl: document.getElementById('location'),
      tempEl: document.getElementById('current-temperature'),
      conditionsEl: document.getElementById('weather-condition'),
      tempMaxEl: document.getElementById('daily-max-temperature'),
      tempMinEl: document.getElementById('daily-min-temperature'),
      dateEl: document.getElementById('date-time'),
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
    // Visibility
    vs.init({ distanceEl: document.getElementById('visibility-value') });
    // Pressure
    ps.init({
      pointerEl: document.getElementById('barometer-pointer'),
      pressureEl: document.getElementById('pressure-value'),
      unitsEl: document.getElementById('pressure-units'),
    });
    // Humidity
    hm.init({
      humidityEl: document.getElementById('humidity-value'),
      dewEl: document.getElementById('dew-value'),
    });
    // MoonPhase
    mp.init({
      moonFirstEl: document.getElementById('moon'),
      moonSecondEl: document.getElementById('moonphase-shade'),
      moonPhaseNameEl: document.getElementById('moonphase-name'),
    });
    // Feels Like
    fl.init({
      tempEl: document.getElementById('feelslike-value'),
      descriptionEl: document.getElementById('feelslike-description'),
    });
    // Air Quality
    aq.init({
      valueEl: document.getElementById('air-quality-value'),
      levelEl: document.getElementById('air-quality-level'),
      meterEl: document.getElementById('air-quality-meter-container'),
      markerEl: document.getElementById('air-quality-meter-marker'),
    });
    // Precipitation
    pc.init({
      valueEl: document.getElementById('precipitation-data-past-6h'),
    });
    // Hours
    h.init({
      containerEl: document.getElementById('weather-hours-container'),
      descriptionEl: document.getElementById('description'),
    });
    // Days
    d.init({ containerEl: document.getElementById('weather-days-container') });
  }

  function toggleSpinner() {
    spinnerEl.classList.toggle('hidden');
  }

  function toggleSettings() {
    openSettingsBtnEl.classList.toggle('hidden');
    settingsEl.classList.toggle('hidden');
  }

  function bindSearch(handleSearch) {
    const searchInputEl = document.getElementById('search-input');
    const searchFormEl = document.getElementById('search-form');

    searchFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const locationQuery = searchInputEl.value.trim();
      handleSearch(locationQuery);
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

  function bindHours(handleHourSelection) {
    const hoursEl = document.getElementById('weather-hours-container');
    hoursEl.addEventListener('click', (e) => {
      const hourEl = e.target.closest('.weather-hour') || null;
      if (!hourEl) return;
      const { dayIndex, hourIndex } = hourEl.dataset;
      handleHourSelection(Number(dayIndex), Number(hourIndex));
    });
  }

  function bindDays(handleDaySelection) {
    const daysEl = document.getElementById('weather-days-container');
    daysEl.addEventListener('click', (e) => {
      const dayEl = e.target.closest('.weather-day') || null;
      if (!dayEl) return;
      const { dayIndex } = dayEl.dataset;
      handleDaySelection(Number(dayIndex));
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

  // eslint-disable-next-line no-shadow
  function formatHours(hours, units) {
    return hours.map((hour) => ({
      ...hour,
      temp: format.formatTemp(hour.temp, units),
    }));
  }

  // eslint-disable-next-line no-shadow
  function formatDays(days, units) {
    return days.map((day) => ({
      ...day,
      tempMax: format.formatTemp(day.tempMax, units),
      tempMin: format.formatTemp(day.tempMin, units),
      temp: format.formatTemp(day.temp, units),
    }));
  }

  function update(state) {
    const { hour, day, location, units } = state;
    const { timeZone } = location;
    const [today, tomorrow] = location.days;
    const now = Date.now();
    const tzNow = new TZDate(now, timeZone);
    const tzDay = new TZDate(day.dateTime * 1000, timeZone);
    const isToday = isSameDay(tzNow, tzDay);
    let displayHours;

    // fetch 24h from now and format
    if (day.index === 0) {
      const fetchedHours = fetchAndFillHours(today.hours, tomorrow.hours, now, location.timeZone);
      fetchedHours[0] = location.currentConditions;
      fetchedHours[0].dayIndex = 0;
      fetchedHours[0].index = 0;
      fetchedHours[0].dateTime = now / 1000;
      displayHours = formatHours(fetchedHours, units.temp);
    } else {
      displayHours = formatHours(day.hours, units.temp);
    }

    // environment
    const selHours = new TZDate(hour.dateTime * 1000, timeZone).getHours();
    const sunriseHours = new TZDate(day.sunrise * 1000, timeZone).getHours();
    const sunsetHours = new TZDate(day.sunset * 1000, timeZone).getHours();
    const bodyEl = document.querySelector('body');
    const sunMoonEl = document.getElementById('sun');
    sunMoonEl.classList.remove(...sunMoonEl.classList);
    if (selHours < sunriseHours || selHours > sunsetHours) {
      bodyEl.style.background = 'var(--bg-night)';
      sunMoonEl.classList.add('mooon');
    } else if (selHours <= sunsetHours && selHours > sunsetHours - 3) {
      bodyEl.style.background = 'var(--bg-summer-evening)';
      sunMoonEl.classList.add('sun');
    } else {
      bodyEl.style.background = 'var(--bg-day)';
      sunMoonEl.classList.add('sun');
    }

    if (hour.conditions === 'Rain') {
      bodyEl.style.background = 'var(--bg-rain)';
    }

    // Summary
    sum.update(
      location.address,
      format.formatTemp(hour.temp, units.temp),
      hour.conditions,
      format.formatTemp(day.tempMax, units.temp),
      format.formatTemp(day.tempMin, units.temp),
      hour.dateTime,
      timeZone,
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
    // Visibility
    vs.update(format.formatDist(hour.visibility, units.dist), units.dist);
    // Pressure
    ps.update(
      format.formatPres(hour.pressure, units.pres),
      format.formatPres(950, units.pres),
      format.formatPres(1050, units.pres),
      units.pres,
    );
    // Humidity
    hm.update(hour.humidity, format.formatTemp(hour.dew, units.temp));
    // Moon Phase
    mp.update(day.moonPhase);
    // Feels Like
    fl.update(format.formatTemp(hour.feelsLike, units.temp), format.formatTemp(hour.temp));
    // Air Quality
    aq.update(hour.airQuality);
    // Precipitation
    pc.update(format.formatPrec(day.precip, units.prec), units.prec);
    // Hours
    h.update(displayHours, location.description, location.timeZone, isToday);
    // Days
    d.update(formatDays(location.days, units.temp), units.temp);
  }

  return {
    init,
    initSettings,
    toggleSpinner,
    bindSearch,
    bindSettings,
    bindHours,
    bindDays,
    updateSettings,
    update,
  };
}
