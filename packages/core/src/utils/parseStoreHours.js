import { parseDate } from './parseDate';
import { toTimeString } from './formatTime';

export function parseStoreHours(hoursOfOperation) {
  let carryOverClosingHour;
  let result = [];
  hoursOfOperation.map(day => {
    // store was opened on the previous date and closing today,
    // so we need to push it as the first opening time of today
    if (carryOverClosingHour) {
      let date = carryOverClosingHour.split(' ')[0];
      day.availability.unshift({
        from: date + ' 00:00:00',
        to: carryOverClosingHour,
      });
      carryOverClosingHour = null;
    }

    let parsableFromDate = day.availability[0].from.replace('T', ' ');
    let parsableToDate = day.availability[day.availability.length - 1].to.replace('T', ' ');
    let fromDate = parseDate(parsableFromDate);
    let toDate = parseDate(parsableToDate);

    let storeHours = {
      dayName: day.nick.toUpperCase() || '',
      openIntervals: day.availability.map(availability => {
        let parsableFromDate = availability.from.replace('T', ' ');
        let parsableToDate = availability.to.replace('T', ' ');
        let fromDate = parseDate(parsableFromDate);
        let toDate = parseDate(parsableToDate);
        let isSameDay =
          fromDate.getFullYear() === toDate.getFullYear() &&
          fromDate.getMonth() === toDate.getMonth() &&
          fromDate.getDate() === toDate.getDate();

        if (!isSameDay) {
          // save carry over for next day
          carryOverClosingHour = parsableToDate;
          // set closing hour at 23.59.59 of today
          parsableToDate =
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1) +
            '-' +
            fromDate.getDate() +
            ' 23:59:59';
        }

        return {
          fromHour: parsableFromDate,
          toHour: parsableToDate,
        };
      }),
      isClosed: day.availability[0].status === 'closed',
    };

    result.push(storeHours);
  });

  return result;
}

export function parseStoreOpeningAndClosingTimes(store) {
  let openingClosingTimes = {
    todayOpeningTime: null,
    todayClosingTime: null,
    tomorrowOpeningTime: null,
    tomorrowClosingTime: null,
  };

  try {
    let hours = JSON.parse(store.shippingAddressDetails.storeHours);
    openingClosingTimes.todayOpeningTime = toTimeString(
      parseDate(hours.storeHours[0].availability[0].from)
    );
    openingClosingTimes.todayClosingTime = toTimeString(
      parseDate(hours.storeHours[0].availability[0].to)
    );
    openingClosingTimes.tomorrowOpeningTime = toTimeString(
      parseDate(hours.storeHours[1].availability[0].from)
    );
    openingClosingTimes.tomorrowClosingTime = toTimeString(
      parseDate(hours.storeHours[1].availability[0].to)
    );
  } catch (error) {
    return openingClosingTimes;
  }

  return openingClosingTimes;
}
