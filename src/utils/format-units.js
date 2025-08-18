export default function formatUnits() {
  // temp
  function formatTemp(temp, units) {
    if (units === 'f') return temp;
    return Math.round((temp - 32) * (5 / 9));
  }
  // speed
  function formatWind(speed, units) {
    if (units === 'mi/h') return speed;
    return Math.round(speed * 1.609);
  }
  // pressure
  function formatPres(press, units) {
    if (units === 'mb') return press;
    return Math.round(press / 33.864);
  }
  // distance
  function formatDist(dist, units) {
    if (units === 'mi') return dist;
    return Math.round(dist * 1.609);
  }
  // precip
  function formatPrec(prec, units) {
    if (units === 'in') return prec;
    return Math.round(prec * 2.54);
  }

  return {
    formatTemp,
    formatWind,
    formatPres,
    formatDist,
    formatPrec,
  };
}
