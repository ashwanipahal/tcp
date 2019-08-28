import { routerPush } from '../../../../../utils';

/**
 * Populate the calendar dates
 */
export const calendarYearsMap = () => {
  const yearOptionsMap = [{ id: 'Yyyy', displayName: 'Yyyy' }];
  const nowYear = new Date().getFullYear();
  let i = nowYear - 17;
  while (i >= nowYear - 110) {
    yearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
    i -= 1;
  }
  return yearOptionsMap;
};

/**
 * Populate the calendar days with appended 0 for single digit dates
 */
export const calendarDaysMap = () => {
  const dayOptionsMap = [{ id: 'Dd', displayName: 'Dd' }];
  let i = 1;
  while (i < 32) {
    let num = '';
    if (i <= 9) {
      num = `0${i}`;
    } else {
      num = i;
    }
    dayOptionsMap.push({ id: num.toString(), displayName: num.toString() });
    i += 1;
  }
  return dayOptionsMap;
};

/**
 * @constant backToHome
 * @description - redirecting back to home page.
 */
export const backToHome = () => {
  routerPush('/', '/home');
};
