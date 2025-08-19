export default function feelsLike() {
  let tempEl;
  let descriptionEl;

  function init(refs) {
    ({ tempEl, descriptionEl } = refs);
  }

  function update(feelsLikeTemp, currentTemp) {
    tempEl.textContent = feelsLikeTemp;
    descriptionEl.textContent =
      feelsLikeTemp > currentTemp
        ? 'The thermal sensation is higher than the actual temperature.'
        : 'The thermal sensation is lower than the actual temperature.';
  }

  return {
    init,
    update,
  };
}
