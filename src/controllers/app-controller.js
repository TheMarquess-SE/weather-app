import fetchWeather from '../services/weather-api';
import createLocation from '../models/create-location';

export default function appController(screen) {
  const locations = [];
  const state = {
    location: null,
    day: null,
    hour: null,
    units: {
      temp: 'f',
      wind: 'mi/h',
      pres: 'mb',
      dist: 'mi',
      prec: 'in',
    },
  };

  async function processSearch(locationQuery) {
    screen.toggleSpinner();
    try {
      const savedLocation = locations.find((savedLoc) => savedLoc.address === locationQuery);
      if (savedLocation) {
        const { days, currentConditions } = savedLocation;
        state.location = savedLocation;
        [state.day] = days;
        state.hour = currentConditions;
        console.log('Using saved');
      } else {
        const rawData = await fetchWeather(locationQuery);
        console.log(rawData);
        const location = createLocation(rawData);
        const { days, currentConditions } = location;
        locations.push(location);
        console.log(locations);
        state.location = location;
        [state.day] = days;
        state.hour = currentConditions;
      }
    } catch (err) {
      // chore: display the error
      console.log(err);
    } finally {
      screen.update(state);
      screen.toggleSpinner();
    }
  }

  function changeUnits(type, newUnit) {
    state.units[type] = newUnit;
    console.log(state.units);
    screen.updateSettings(state.units);
    screen.update(state);
  }

  function init() {
    screen.init();
    screen.bindSearch(processSearch);
    screen.initSettings(state.units);
    screen.bindSettings(changeUnits);
  }

  return {
    init,
  };
}
