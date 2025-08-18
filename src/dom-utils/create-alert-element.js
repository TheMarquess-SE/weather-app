import { createEl } from './dom-utils';

export default function createAlertElement(alert) {
  const alertTitle = createEl('p', {
    className: 'alert-title',
    textContent: alert.title,
  });
  const alertDescription = createEl('p', {
    className: 'alert-description',
    textContent: alert.description,
  });

  const alertEl = createEl('div', { className: 'alert' }, [alertTitle, alertDescription]);
  return alertEl;
}
