import { TZDate } from '@date-fns/tz';
import { formatTimeShort } from '../../utils/format-time';

export default function sunrise() {
  let mainEl;
  let secondEl;
  let titleEl;
  let iconEl;
  let lineEl;
  let markerEl;

  function init(refs) {
    ({ mainEl, secondEl, titleEl, iconEl, lineEl, markerEl } = refs);
  }

  // Gets the x and y point for an hour in the svg path
  function getMarkerPosition(hour) {
    const svgWidth = 200;
    const x = (hour / 23) * svgWidth;
    let y;

    if (x <= 50) {
      // segment 1
      const t = x / 50;
      y = (1 - t) ** 2 * 79.33 + 2 * (1 - t) * t * 60 + t ** 2 * 40;
    } else if (x <= 150) {
      // segment 2
      const t = (x - 50) / 100;
      y = (1 - t) ** 2 * 40 + 2 * (1 - t) * t * 0 + t ** 2 * 40;
    } else {
      // segment 3
      const t = (x - 150) / 50;
      y = (1 - t) ** 2 * 40 + 2 * (1 - t) * t * 60 + t ** 2 * 79.33;
    }

    return { x, y };
  }

  function update(sunriseEpoch, sunsetEpoch, currentTimeEpoch, timeZone) {
    const currentTime = new TZDate(currentTimeEpoch, timeZone);
    const sunriseTime = new TZDate(sunriseEpoch * 1000, timeZone);
    const sunsetTime = new TZDate(sunsetEpoch * 1000, timeZone);
    const currentHours = currentTime.getHours();
    const sunriseHours = sunriseTime.getHours();
    const sunsetHours = sunsetTime.getHours();
    const markerPosition = getMarkerPosition(currentHours);
    const sunrisePosition = getMarkerPosition(sunriseHours);
    const sunsetPosition = getMarkerPosition(sunsetHours);

    if (currentHours < sunriseHours || currentHours > sunsetHours) {
      // sunrise
      titleEl.textContent = 'SUNRISE';
      iconEl.classList.remove('fa-arrow-down');
      iconEl.classList.add('fa-arrow-up');
      mainEl.textContent = formatTimeShort(sunriseTime);
      secondEl.textContent = `Sunset ${formatTimeShort(sunsetTime)}`;
      lineEl.style.top = `${sunrisePosition.y}px`;
    } else {
      // sunset
      titleEl.textContent = 'SUNSET';
      iconEl.classList.remove('fa-arrow-up');
      iconEl.classList.add('fa-arrow-down');
      mainEl.textContent = formatTimeShort(sunsetTime);
      secondEl.textContent = `Sunrise ${formatTimeShort(sunriseTime)}`;
      lineEl.style.top = `${sunsetPosition.y}px`;
    }
    // -7 positions the center of the markerEl at the point
    markerEl.style.left = `${markerPosition.x - 7}px`;
    markerEl.style.top = `${markerPosition.y - 7}px`;
  }

  return {
    init,
    update,
  };
}
