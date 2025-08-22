import './humidity.css';

export default function humidity() {
  let humidityEl;
  let dewEl;

  function init(refs) {
    ({ humidityEl, dewEl } = refs);
  }

  // eslint-disable-next-line no-shadow
  function update(humidity, dew) {
    humidityEl.textContent = humidity;
    dewEl.textContent = dew;
  }

  return {
    init,
    update,
  };
}
