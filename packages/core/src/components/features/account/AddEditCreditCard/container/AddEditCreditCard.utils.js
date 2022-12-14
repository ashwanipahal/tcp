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
      label: `01 (${MONTH_SHORT_FORMAT.JAN}.)`,
      id: '1',
      displayName: `01 (${MONTH_SHORT_FORMAT.JAN}.)`,
    },
    {
      value: '2',
      label: `02 (${MONTH_SHORT_FORMAT.FEB}.)`,
      id: '2',
      displayName: `02 (${MONTH_SHORT_FORMAT.FEB}.)`,
    },
    {
      value: '3',
      label: `03 (${MONTH_SHORT_FORMAT.MAR}.)`,
      id: '3',
      displayName: `03 (${MONTH_SHORT_FORMAT.MAR}.)`,
    },
    {
      value: '4',
      label: `04 (${MONTH_SHORT_FORMAT.APR}.)`,
      id: '4',
      displayName: `04 (${MONTH_SHORT_FORMAT.APR}.)`,
    },
    {
      value: '5',
      label: `05 (${MONTH_SHORT_FORMAT.MAY}.)`,
      id: '5',
      displayName: `05 (${MONTH_SHORT_FORMAT.MAY}.)`,
    },
    {
      value: '6',
      label: `06 (${MONTH_SHORT_FORMAT.JUN}.)`,
      id: '6',
      displayName: `06 (${MONTH_SHORT_FORMAT.JUN}.)`,
    },
    {
      value: '7',
      label: `07 (${MONTH_SHORT_FORMAT.JUL}.)`,
      id: '7',
      displayName: `07 (${MONTH_SHORT_FORMAT.JUL}.)`,
    },
    {
      value: '8',
      label: `08 (${MONTH_SHORT_FORMAT.AUG}.)`,
      id: '8',
      displayName: `08 (${MONTH_SHORT_FORMAT.AUG}.)`,
    },
    {
      value: '9',
      label: `09 (${MONTH_SHORT_FORMAT.SEP}.)`,
      id: '9',
      displayName: `09 (${MONTH_SHORT_FORMAT.SEP}.)`,
    },
    {
      value: '10',
      label: `10 (${MONTH_SHORT_FORMAT.OCT}.)`,
      id: '10',
      displayName: `10 (${MONTH_SHORT_FORMAT.OCT}.)`,
    },
    {
      value: '11',
      label: `11 (${MONTH_SHORT_FORMAT.NOV}.)`,
      id: '11',
      displayName: `11 (${MONTH_SHORT_FORMAT.NOV}.)`,
    },
    {
      value: '12',
      label: `12 (${MONTH_SHORT_FORMAT.DEC}.)`,
      id: '12',
      displayName: `12 (${MONTH_SHORT_FORMAT.DEC}.)`,
    },
  ];

  const expYearOptionsMap = [];
  const nowYear = new Date().getFullYear();
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({
      value: i.toString(),
      label: i.toString(),
      id: i.toString(),
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
