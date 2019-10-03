import { toTimeString } from './utils';
import { parseDate, isDayOfWeek, COMPLETE_MONTH } from './parseDate';

const formatStoreTiming = storeTimingArr => {
  const formattedStore = [];
  const parseTimeStr = timeStr => {
    try {
      return toTimeString(parseDate(timeStr));
    } catch (err) {
      return timeStr;
    }
  };
  const parseDayStr = dayStr => {
    const parsedDate = parseDate(dayStr);
    return `${COMPLETE_MONTH[parsedDate.getMonth()]} ${parsedDate.getDate()}`;
  };
  storeTimingArr.forEach((time, i) => {
    const { dayName, openIntervals } = time;
    const toFromTime = openIntervals.map(
      item => `${parseTimeStr(item.fromHour)} - ${parseTimeStr(item.toHour)}`
    );
    const timeDayObj = {};
    /**
     *  To check if we have a date string -- If the parseTimeStr return the same param, then the
     *  other time will be sent.
     * */
    const dayStr =
      parseTimeStr(openIntervals[0].fromHour) === openIntervals[0].fromHour
        ? openIntervals[0].toHour
        : openIntervals[0].fromHour;
    timeDayObj.id = i;
    timeDayObj.label = isDayOfWeek(dayName.toLowerCase())
      ? `${dayName.toLowerCase()}, ${parseDayStr(dayStr)}`
      : dayName;
    timeDayObj.value = toFromTime;
    formattedStore.push(timeDayObj);
  });

  return formattedStore;
};

export default formatStoreTiming;
