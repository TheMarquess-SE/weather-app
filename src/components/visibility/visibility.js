export default function visibility() {
  let distanceEl;

  function init(refs) {
    ({ distanceEl } = refs);
  }

  function update(distance, units) {
    distanceEl.textContent = `${distance} ${units}`;
  }

  return {
    init,
    update,
  };
}
