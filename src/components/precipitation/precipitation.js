export default function precipitation() {
  let valueEl;

  function init(refs) {
    ({ valueEl } = refs);
  }

  function update(value, units) {
    valueEl.textContent = `${value} ${units}`;
  }

  return {
    init,
    update,
  };
}
