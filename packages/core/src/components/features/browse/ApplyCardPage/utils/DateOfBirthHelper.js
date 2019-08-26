import { routerPush } from '@tcp/core/src/utils';

/**
 * Populate the calendar dates
 */
export const calendarYearsMap = () => {
  const yearOptionsMap = [{ id: 'Yyyy', displayName: 'Yyyy' }];
  const nowYear = new Date().getFullYear();
  // eslint-disable-next-line
  for (let i = nowYear - 17; i >= nowYear - 110; i--) {
    yearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }
  return yearOptionsMap;
};

/**
 * Populate the calendar days with appended 0 for single digit dates
 */
export const calendarDaysMap = () => {
  const dayOptionsMap = [{ id: 'Dd', displayName: 'Dd' }];
  // eslint-disable-next-line
  for (let i = 1; i < 32; i++) {
    if (i <= 9) {
      // eslint-disable-next-line
      i = '0' + i;
    }
    dayOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }
  return dayOptionsMap;
};

// FIXME: (took this from checkoutStoreView) im expecting this to be moved to the proper internationalization namespace
export const MONTH_SHORT_FORMAT = {
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

export const MONTH_OPTIONS_MAP_WITH_EMPTY = [
  { id: 'Mm', displayName: 'Mm' },
  { id: '01', displayName: MONTH_SHORT_FORMAT.JAN },
  { id: '02', displayName: MONTH_SHORT_FORMAT.FEB },
  { id: '03', displayName: MONTH_SHORT_FORMAT.MAR },
  { id: '04', displayName: MONTH_SHORT_FORMAT.APR },
  { id: '05', displayName: MONTH_SHORT_FORMAT.MAY },
  { id: '06', displayName: MONTH_SHORT_FORMAT.JUN },
  { id: '07', displayName: MONTH_SHORT_FORMAT.JUL },
  { id: '08', displayName: MONTH_SHORT_FORMAT.AUG },
  { id: '09', displayName: MONTH_SHORT_FORMAT.SEP },
  { id: '10', displayName: MONTH_SHORT_FORMAT.OCT },
  { id: '11', displayName: MONTH_SHORT_FORMAT.NOV },
  { id: '12', displayName: MONTH_SHORT_FORMAT.DEC },
];

/**
 * @constant backToHome
 * @description - redirecting back to home page.
 */
export const backToHome = () => {
  routerPush('/', '/home');
};
