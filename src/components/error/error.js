import './error.css';

export default function error() {
  let msgEl;

  function init(refs) {
    ({ msgEl } = refs);
  }

  function update(errMsg) {
    msgEl.textContent = errMsg;
  }

  return {
    init,
    update,
  };
}
