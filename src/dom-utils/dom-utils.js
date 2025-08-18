// create Elements
export function createEl(tag, props = {}, children = []) {
  const el = Object.assign(document.createElement(tag), props);
  children.forEach((child) => el.appendChild(child));
  return el;
}
// clear Element Content
export function clear(e) {
  e.innerHTML = '';
}
