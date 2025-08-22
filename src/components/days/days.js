import createDayElement from '../../dom-utils/create-day-element';
import './days.css';

export default function days() {
  let containerEl;

  function init(refs) {
    ({ containerEl } = refs);
  }

  // eslint-disable-next-line no-shadow
  function getGlobalTempRange(days) {
    const allTemps = days.flatMap((day) => [day.tempMin, day.tempMax]);
    return {
      globalMin: Math.min(...allTemps),
      globalMax: Math.max(...allTemps),
    };
  }

  // eslint-disable-next-line no-shadow
  function update(days, units) {
    containerEl.innerHTML = '';
    const { globalMin, globalMax } = getGlobalTempRange(days);
    const daysEls = days.map((day, index) =>
      createDayElement(day, globalMax, globalMin, units, index),
    );
    daysEls[0].querySelector('.weather-day > p').textContent = 'Today';
    daysEls.forEach((dayEl) => containerEl.appendChild(dayEl));
  }

  return {
    init,
    update,
  };
}
