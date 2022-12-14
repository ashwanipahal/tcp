/**
 * A utility function to parse a specific format of date.
 * new Date("2017-03-16 11:21:49.994") does not work on some browsers (like mobile)
 * so we need to (a) request backend to send a standard format for dates, or (b) parse the date manualmente
 *
 * @author Agu
 * @author Lalit Guglani
 * @example parseDate("2017-03-16 11:21:49.994")
 * */
import invariant from 'invariant';

function parseDate(string) {
  const parts = string
    .trim()
    .match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2}).([0-9]{2}):([0-9]{2}):([0-9]{2})\.?([0-9]{0,3})$/); // eslint-disable-line

  if (!parts) {
    invariant(true, `Incorrect date format: ${string}. Expected dddd-dd-dd dd:dd:dd.ddd`);
  }

  try {
    return new Date(
      parseInt(parts[1], 10),
      parseInt(parts[2], 10) - 1,
      parseInt(parts[3], 10),
      parseInt(parts[4], 10),
      parseInt(parts[5], 10),
      parseInt(parts[6], 10),
      parseInt(parts[7], 10) || 0
    );
  } catch (ex) {
    return new Date(string);
  }
}

/**
 * @summary This method will receive two Date() params
 */
export function compareDate(firstDate, secondDate) {
  // eslint-disable-next-line no-underscore-dangle
  const _a = firstDate;
  // eslint-disable-next-line no-underscore-dangle
  const _b = secondDate;

  const a = new Date(_a.getFullYear().toString(), _a.getMonth(), _a.getDate());
  const b = new Date(_b.getFullYear().toString(), _b.getMonth(), _b.getDate());

  if (a >= b) {
    return true;
  }

  return false;
}

/**
 * @summary This is used mainly because backend sends days also as names of holidays, this will help us know if the day they send is an actual weekday
 */
export function isDayOfWeek(day) {
  switch (day) {
    case 'monday':
      return true;
    case 'tuesday':
      return true;
    case 'wednesday':
      return true;
    case 'thursday':
      return true;
    case 'friday':
      return true;
    case 'saturday':
      return true;
    case 'sunday':
      return true;
    default:
      return false;
  }
}

/**
 * @summary This helps us translate the getMonth() to an abbreviation of the month
 */
export const MONTH = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEPT',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC',
};

export const COMPLETE_MONTH = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export { parseDate };
