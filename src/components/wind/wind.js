import './wind.css';

export default function wind() {
  let speedEl;
  let gustsEl;
  let directionEl;
  let arrowEl;
  let mainSpeedEl;
  let mainSpeedUnitsEl;

  function init(refs) {
    ({ speedEl, gustsEl, directionEl, arrowEl, mainSpeedEl, mainSpeedUnitsEl } = refs);
  }

  const textualWindDirection = (degrees) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];

    const index = Math.round(degrees / 22.5) % 16;

    return directions[index];
  };

  function update(speed, gusts, direction, units) {
    speedEl.textContent = `${speed} ${units}`;
    gustsEl.textContent = `${gusts} ${units}`;
    directionEl.textContent = `${direction}° ${textualWindDirection(direction)}`;
    mainSpeedEl.textContent = speed;
    mainSpeedUnitsEl.textContent = units;
    // compass set 0° at north
    arrowEl.style.transform = `rotate(${direction + 90}deg)`;
  }

  return {
    init,
    update,
  };
}
