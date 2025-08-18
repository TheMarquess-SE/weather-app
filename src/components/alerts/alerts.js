import createAlertElement from '../../dom-utils/create-alert-element';

export default function alerts() {
  let alertsEl;

  function init(refs) {
    ({ alertsEl } = refs);
  }

  // eslint-disable-next-line no-shadow
  function update(alerts) {
    alertsEl.innerHTML = '';
    alerts.forEach((alert) => alertsEl.appendChild(createAlertElement(alert)));
  }

  return {
    init,
    update,
  };
}
