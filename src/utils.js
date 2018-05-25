export function secondToString(second) {
  let string = '';
  if (second > -1) {
    const m = Math.floor(second / 60) % 60;
    const s = second % 60;
    if (m < 10) string += '0';
    string += `${m}:`;
    if (s < 10) string += '0';
    string += `${s}`;
  }
  return string;
}
