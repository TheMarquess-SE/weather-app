import './moon-phase.css';

export default function moonPhase() {
  let moonFirstEl;
  let moonSecondEl;
  let moonPhaseNameEl;

  function init(refs) {
    ({ moonFirstEl, moonSecondEl, moonPhaseNameEl } = refs);
  }

  // eslint-disable-next-line no-shadow
  function update(moonPhase) {
    const width = moonFirstEl.offsetWidth;
    const setMoonPhaseName = (name) => {
      moonPhaseNameEl.textContent = name;
    };
    const setPositionMoonSecondEl = (position) => {
      moonSecondEl.style.left = `${position}px`;
    };
    const setColorsShadowOverMoon = () => {
      moonSecondEl.style.backgroundColor = 'rgba(179, 179, 179, 0.5)';
      moonFirstEl.style.backgroundColor = 'rgb(210, 210, 210)';
    };
    const setColorsMoonOverShadow = () => {
      moonSecondEl.style.backgroundColor = 'rgb(210, 210, 210)';
      moonFirstEl.style.backgroundColor = 'rgba(179, 179, 179, 0.5)';
    };
    const straightRightBorder = () => {
      moonSecondEl.style.borderTopRightRadius = '0px';
      moonSecondEl.style.borderBottomRightRadius = '0px';
    };

    if (moonPhase >= 0.97 || moonPhase <= 0.03) {
      // NEW MOON
      setMoonPhaseName('New Moon');
      setColorsShadowOverMoon();
      setPositionMoonSecondEl(0);
    } else if (moonPhase > 0.03 && moonPhase <= 0.22) {
      // WAXING CRESCENT
      setMoonPhaseName('Waxing Crescent');
      setColorsShadowOverMoon();
      setPositionMoonSecondEl(width * 0.25 * -1);
    } else if (moonPhase > 0.22 && moonPhase <= 0.28) {
      // FIRST QUARTER
      setMoonPhaseName('First Quarter');
      setColorsShadowOverMoon();
      setPositionMoonSecondEl(width * 0.5 * -1);
      straightRightBorder();
    } else if (moonPhase > 0.28 && moonPhase <= 0.47) {
      // WAXING GIBBOUS
      setMoonPhaseName('Waxing Gibbous');
      setColorsMoonOverShadow();
      setPositionMoonSecondEl(width * 0.25);
    } else if (moonPhase > 0.47 && moonPhase <= 0.53) {
      // FULL MOON
      setMoonPhaseName('Full moonFirstEl');
      setColorsShadowOverMoon();
      setPositionMoonSecondEl(width);
    } else if (moonPhase > 0.53 && moonPhase <= 0.72) {
      // WANING GIBBOUS
      setMoonPhaseName('Waning Gibbous');
      setColorsMoonOverShadow();
      setPositionMoonSecondEl(width * 0.25 * -1);
    } else if (moonPhase > 0.72 && moonPhase <= 0.78) {
      // LAST QUARTER
      setMoonPhaseName('Last Quarter');
      setColorsMoonOverShadow();
      setPositionMoonSecondEl(width * 0.5 * -1);
      straightRightBorder();
    } else if (moonPhase > 0.78 && moonPhase < 0.97) {
      // WANING CRESCENT
      setMoonPhaseName('Waning Crescent');
      setColorsShadowOverMoon();
      setPositionMoonSecondEl(width * 0.25);
    }
  }

  return {
    init,
    update,
  };
}
