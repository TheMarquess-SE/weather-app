import './uv-index.css';

export default function uvIndex() {
  let valueEl;
  let levelEl;
  let meterEl;
  let markerEl;

  function init(refs) {
    ({ valueEl, levelEl, meterEl, markerEl } = refs);
  }

  function getLevel(value) {
    // uvIndex scale 0-11+
    if (value <= 2) {
      return 'Low';
    }
    if (value <= 5) {
      return 'Moderate';
    }
    if (value <= 7) {
      return 'High';
    }
    if (value <= 10) {
      return 'Very High';
    }
    // uv index 11+
    return 'Extreme';
  }

  function update(value) {
    valueEl.textContent = value;
    levelEl.textContent = getLevel(value);
    const w = meterEl.offsetWidth || 0;
    markerEl.style.transform = `translateX(${(value / 11) * w}px)`;
  }

  return {
    init,
    update,
  };
}
