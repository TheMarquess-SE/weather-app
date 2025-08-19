import createHourElement from '../../dom-utils/create-hour-element';

export default function hours() {
  let containerEl;
  let descriptionEl;

  function init(refs) {
    ({ containerEl, descriptionEl } = refs);
  }

  function clear() {
    containerEl.innerHTML = '';
    descriptionEl.textContent = '';
  }

  // eslint-disable-next-line no-shadow
  function update(hours, description, timeZone, isToday) {
    clear();
    // update hours
    const hourEls = hours.map((hour) => createHourElement(hour, timeZone));
    if (isToday) {
      hourEls[0].querySelector('.weather-hour > p').textContent = 'Now';
    }
    hourEls.forEach((hourEl) => containerEl.appendChild(hourEl));

    // update description
    descriptionEl.textContent = description;
  }

  return {
    init,
    clear,
    update,
  };
}
