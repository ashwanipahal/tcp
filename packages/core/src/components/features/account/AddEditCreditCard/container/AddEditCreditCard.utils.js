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
    {
      value: '1',
      id: '1',
      label: `01 (${MONTH_SHORT_FORMAT.JAN}.)`,
      displayName: `01 (${MONTH_SHORT_FORMAT.JAN}.)`,
    },
    {
      value: '2',
      id: '2',
      label: `02 (${MONTH_SHORT_FORMAT.FEB}.)`,
      displayName: `02 (${MONTH_SHORT_FORMAT.FEB}.)`,
    },
    {
      value: '3',
      id: '3',
      label: `03 (${MONTH_SHORT_FORMAT.MAR}.)`,
      displayName: `03 (${MONTH_SHORT_FORMAT.MAR}.)`,
    },
    {
      value: '4',
      id: '4',
      label: `04 (${MONTH_SHORT_FORMAT.APR}.)`,
      displayName: `04 (${MONTH_SHORT_FORMAT.APR}.)`,
    },
    {
      value: '5',
      id: '5',
      label: `05 (${MONTH_SHORT_FORMAT.MAY}.)`,
      displayName: `05 (${MONTH_SHORT_FORMAT.MAY}.)`,
    },
    {
      value: '6',
      id: '6',
      label: `06 (${MONTH_SHORT_FORMAT.JUN}.)`,
      displayName: `06 (${MONTH_SHORT_FORMAT.JUN}.)`,
    },
    {
      value: '7',
      id: '7',
      label: `07 (${MONTH_SHORT_FORMAT.JUL}.)`,
      displayName: `07 (${MONTH_SHORT_FORMAT.JUL}.)`,
    },
    {
      value: '8',
      id: '8',
      label: `08 (${MONTH_SHORT_FORMAT.AUG}.)`,
      displayName: `08 (${MONTH_SHORT_FORMAT.AUG}.)`,
    },
    {
      value: '9',
      id: '9',
      label: `09 (${MONTH_SHORT_FORMAT.SEP}.)`,
      displayName: `09 (${MONTH_SHORT_FORMAT.SEP}.)`,
    },
    {
      value: '10',
      id: '10',
      label: `10 (${MONTH_SHORT_FORMAT.OCT}.)`,
      displayName: `10 (${MONTH_SHORT_FORMAT.OCT}.)`,
    },
    {
      value: '11',
      id: '11',
      label: `11 (${MONTH_SHORT_FORMAT.NOV}.)`,
      displayName: `11 (${MONTH_SHORT_FORMAT.NOV}.)`,
    },
    {
      value: '12',
      id: '12',
      label: `12 (${MONTH_SHORT_FORMAT.DEC}.)`,
      displayName: `12 (${MONTH_SHORT_FORMAT.DEC}.)`,
    },
  ];

  const expYearOptionsMap = [];
  const nowYear = new Date().getFullYear();
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({
      id: i.toString(),
      value: i.toString(),
      label: i.toString(),
      displayName: i.toString(),
    });
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
