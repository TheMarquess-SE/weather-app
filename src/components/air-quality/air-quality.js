export default function airQuality() {
  let valueEl;
  let levelEl;
  let meterEl;
  let markerEl;

  function init(refs) {
    ({ valueEl, levelEl, meterEl, markerEl } = refs);
  }

  function update(value) {
    // eslint-disable-next-line no-shadow
    const setMarker = (value) => {
      const meterWidth = meterEl.offsetWidth;
      let adjustedPosition = (value / 301) * meterWidth;
      if (adjustedPosition > meterWidth) adjustedPosition = meterWidth;
      markerEl.style.transform = `translateX(${adjustedPosition}px)`;
    };
    // eslint-disable-next-line no-shadow
    const getLevel = (value) => {
      // the Air Quality scale goes from 0 to 301+
      if (value <= 50) {
        return 'Good';
      }
      if (value <= 100) {
        return 'Moderate';
      }
      if (value <= 150) {
        return 'Unhealthy for sensitive groups';
      }
      if (value <= 200) {
        return 'Unhealthy';
      }
      if (value <= 300) {
        return 'Very unhealthy';
      }
      // Air Quality 301+
      return 'Hazardous';
    };
    valueEl.textContent = value;
    levelEl.textContent = getLevel(value);
    setMarker(value);
  }

  return {
    init,
    update,
  };
}
