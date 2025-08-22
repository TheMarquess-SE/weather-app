import './pressure.css';

export default function pressure() {
  let pointerEl;
  let pressureEl;
  let unitsEl;

  function init(refs) {
    ({ pointerEl, pressureEl, unitsEl } = refs);
  }

  // eslint-disable-next-line no-shadow
  function setBarometerPointer(pressure, min, max) {
    // where min and max are the min pressure and max for the
    // pressure scale, usually between 950 and 1050 mb
    const position = ((pressure - min) * 240) / (max - min) + 240;
    pointerEl.style.transform = `rotate(${position}deg) translateY(-67px)`;
  }

  // eslint-disable-next-line no-shadow
  function update(pressure, min, max, units) {
    pressureEl.textContent = pressure;
    unitsEl.textContent = units;
    setBarometerPointer(pressure, min, max);
  }

  return {
    init,
    update,
  };
}
