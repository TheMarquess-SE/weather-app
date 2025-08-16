export default function mapIcon(iconName) {
  const iconsList = {
    'clear-day': 'fa-sun',
    'clear-night': 'fa-moon',
    'partly-cloudy-day': 'fa-cloud-sun',
    'partly-cloudy-night': 'fa-cloud-moon',
    cloudy: 'fa-cloud',
    rain: 'fa-cloud-rain',
    snow: 'fa-snowflake',
    fog: 'fa-smog',
    wind: 'fa-wind',
    'showers-day': 'fa-cloud-showers-heavy',
    'showers-night': 'fa-cloud-showers-heavy',
    'thunder-rain': 'fa-cloud-bolt',
    'thunder-showers-day': 'fa-cloud-bolt',
    'thunder-showers-night': 'fa-cloud-bolt',
  };

  return iconsList[iconName] ?? 'fa-cloud';
}
