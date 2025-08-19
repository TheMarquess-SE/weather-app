/**
 * Maps a temperature value to a cool-to-warm color in HSL.
 * The hue value ranges from 240 (blue) to 0 (red).
 */
export default function getTempColor(temp, globalMin, globalMax, units) {
  const range = globalMax - globalMin;
  if (range === 0) return 'hsl(210, 80%, 50%)';

  let hue;

  // FFF
  if (units === 'f') {
    // Cold temperature range (below 68°F)
    if (temp < 68) {
      // Corrected: Map 32°F to 240 and 68°F to 180.
      hue = 240 - 60 * ((temp - 32) / (68 - 32));
      hue = Math.max(180, Math.min(hue, 240));
      return `hsl(${hue}, 80%, 50%)`;
    }
    // Mild temperature range (68°F to 77°F)
    if (temp >= 68 && temp < 77) {
      // Hue from 120 (green) to 60 (yellow)
      hue = 120 - 60 * ((temp - 68) / 9);
      hue = Math.max(60, Math.min(hue, 120));
      return `hsl(${hue}, 80%, 60%)`;
    }
    // Warm temperature range (77°F and over)
    // Hue from 30 (orange) to 0 (red)
    hue = 30 - 30 * ((temp - 77) / (globalMax - 77));
    hue = Math.max(0, Math.min(hue, 30));
    return `hsl(${hue}, 80%, 60%)`;
  }
  // CCC
  // Cold temperature range (below 20°C)
  if (temp < 20) {
    // Corrected: Map 0°C to 240 and 20°C to 180.
    hue = 240 - 60 * (temp / 20);
    hue = Math.max(180, Math.min(hue, 240));
    return `hsl(${hue}, 80%, 50%)`;
  }
  // Mild temperature range (20°C to 25°C)
  if (temp >= 20 && temp < 25) {
    // Hue from 120 (green) to 60 (yellow)
    hue = 120 - 60 * ((temp - 20) / 5);
    hue = Math.max(60, Math.min(hue, 120));
    return `hsl(${hue}, 80%, 60%)`;
  }
  // Warm temperature range (25°C and over)
  // Hue from 30 (orange) to 0 (red)
  hue = 30 - 30 * ((temp - 25) / (globalMax - 25));
  hue = Math.max(0, Math.min(hue, 30));
  return `hsl(${hue}, 80%, 60%)`;
}
