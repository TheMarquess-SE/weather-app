import createHourElement from '../../dom-utils/create-hour-element';

export default function hours() {
  let containerEL;
  let descriptionEl;

  function init(refs) {
    ({ containerEL, descriptionEl } = refs);
  }

  function clear() {
    containerEL.innerHTML = '';
    descriptionEl.textContent = '';
  }

  // eslint-disable-next-line no-shadow
  function update(hours, description, timeZone) {
    // update hours
    const hourEls = hours.map((hour) => createHourElement(hour, timeZone));
    hourEls[0].querySelector('> p').textContent = 'Now';
    hourEls.forEach((hourEl) => containerEL.appendChild(hourEl));

    // update description
    descriptionEl.textContent = description;
  }

  return {
    init,
    clear,
    update,
  };
}
