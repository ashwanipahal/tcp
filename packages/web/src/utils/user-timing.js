import { TIMER_NAMES } from '@tcp/core/src/constants/rum.constants';

export function entryExists(name) {
  return Boolean(performance.getEntriesByName(name).length);
}

export function getAllMarks() {
  return performance.getEntriesByType('mark').filter(entry => TIMER_NAMES.indexOf(entry.name) > -1);
}

export function getAllMeasures() {
  return performance
    .getEntriesByType('measure')
    .filter(entry => TIMER_NAMES.indexOf(entry.name) > -1);
}
