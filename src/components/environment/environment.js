import './environment.css';

export default function environment() {
  let bodyEl;
  let htmlEl;
  let sunMoonEl;

  function init(refs) {
    ({ bodyEl, htmlEl, sunMoonEl } = refs);
  }

  function update(selHours, sunriseHours, sunsetHours, hour) {
    sunMoonEl.classList.remove(...sunMoonEl.classList);
    if (selHours < sunriseHours || selHours > sunsetHours) {
      bodyEl.style.background = 'var(--bg-night)';
      htmlEl.style.background = 'var(--bgh-night)';
      sunMoonEl.classList.add('mooon');
    } else if (selHours <= sunsetHours && selHours > sunsetHours - 3) {
      bodyEl.style.background = 'var(--bg-summer-evening)';
      htmlEl.style.background = 'var(--bgh-summer-evening)';
      sunMoonEl.classList.add('sun');
    } else {
      bodyEl.style.background = 'var(--bg-day)';
      htmlEl.style.background = 'var(--bgh-day)';
      sunMoonEl.classList.add('sun');
    }

    if (hour.conditions.includes('Rain')) {
      bodyEl.style.background = 'var(--bg-rain)';
      htmlEl.style.background = 'var(--bgh-rain)';
    }
  }

  return {
    init,
    update,
  };
}
