const MONTH_SHORT_FORMAT = {
  JAN: 'Jan',
  FEB: 'Feb',
  MAR: 'Mar',
  APR: 'Apr',
  MAY: 'May',
  JUN: 'Jun',
  JUL: 'Jul',
  AUG: 'Aug',
  SEP: 'Sep',
  OCT: 'Oct',
  NOV: 'Nov',
  DEC: 'Dec',
};

export const getCreditCardExpirationOptionMap = () => {
  const expMonthOptionsMap = [
    { id: '1', label: MONTH_SHORT_FORMAT.JAN },
    { id: '2', label: MONTH_SHORT_FORMAT.FEB },
    { id: '3', label: MONTH_SHORT_FORMAT.MAR },
    { id: '4', label: MONTH_SHORT_FORMAT.APR },
    { id: '5', label: MONTH_SHORT_FORMAT.MAY },
    { id: '6', label: MONTH_SHORT_FORMAT.JUN },
    { id: '7', label: MONTH_SHORT_FORMAT.JUL },
    { id: '8', label: MONTH_SHORT_FORMAT.AUG },
    { id: '9', label: MONTH_SHORT_FORMAT.SEP },
    { id: '10', label: MONTH_SHORT_FORMAT.OCT },
    { id: '11', label: MONTH_SHORT_FORMAT.NOV },
    { id: '12', label: MONTH_SHORT_FORMAT.DEC },
  ];

  const expYearOptionsMap = [];
  const nowYear = new Date().getFullYear();
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({ id: i.toString(), label: i.toString() });
  }

  return {
    monthsMap: expMonthOptionsMap,
    yearsMap: expYearOptionsMap,
  };
};

export const convertObjectKeysToLowerCase = obj => {
  let key;
  const keys = (obj && Object.keys(obj)) || [];
  let count = keys.length - 1;
  const newobj = {};
  if (count > 0) {
    while (count) {
      key = keys[count];
      newobj[key.toLowerCase()] = obj[key];
      count -= 1;
    }
  }
  return newobj;
};

export default getCreditCardExpirationOptionMap;
