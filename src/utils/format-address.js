export default function formatAddress(string) {
  const substrings = string.toLowerCase().split(' ');

  if (substrings.length === 1) {
    const first = substrings[0][0].toUpperCase();
    const sliced = substrings[0].slice(1);
    const result = `${first}${sliced}`;
    return result;
  }

  const formated = substrings.map(formatAddress).join(' ');

  return formated;
}
