/* istanbul ignore file */
const toTimeString = est => {
  let hh = est.getHours();
  let mm = est.getMinutes();
  const ampm = hh >= 12 ? ' pm' : ' am';
  hh %= 12;
  hh = hh > 0 ? hh : 12;
  mm = mm < 10 ? `0${mm}` : mm;
  if (hh === 11 && mm === 59 && ampm === ' pm') {
    return 'Midnight';
  }
  return `${hh}:${mm}${ampm}`;
};

export default toTimeString;
