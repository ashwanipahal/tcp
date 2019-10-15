import { useEffect } from 'react';
import Router from 'next/router';
import { NAVIGATION_START } from '@tcp/core/src/constants/rum.constants';
import { getAllMeasures } from '../../../../utils/user-timing';

function sendTimers(entries = []) {
  // Stop if there are no entries
  if (!entries.length) return null;
  // Turn array of performance entries into simple object
  const payload = entries.reduce(
    (accum, entry) => ({
      ...accum,
      [entry.name]: entry.duration || entry.startTime,
    }),
    {}
  );
  // Clear entries
  entries.forEach(entry => performance.clearMeasures(entry.name));
  // Send to third-party service
  if (typeof global.BOOMR !== 'undefined') {
    global.BOOMR.sendTimers(payload);
  }
  return payload;
}

function sendTimersForAllMeasures() {
  sendTimers(getAllMeasures());
}

function handleBeforeHistoryChange() {
  performance.clearMarks(NAVIGATION_START);
  performance.mark(NAVIGATION_START);
}

function handlePageVisibilityChange() {
  if (global.document.visibilityState) {
    sendTimersForAllMeasures();
  }
}

function teardownRouteHandlers() {
  Router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
  Router.events.off('routeChangeStart', sendTimersForAllMeasures);
}

function setupRouteHandlers() {
  Router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
  Router.events.on('routeChangeStart', sendTimersForAllMeasures);
  return teardownRouteHandlers;
}

function teardownPageHandlers() {
  global.removeEventListener('visibilitychange', handlePageVisibilityChange);
  global.removeEventListener('beforeunload', sendTimersForAllMeasures);
}

function setupPageHandlers() {
  global.addEventListener('visibilitychange', handlePageVisibilityChange);
  global.addEventListener('beforeunload', sendTimersForAllMeasures);
  return teardownPageHandlers;
}

export default function UserTimingReporter(props) {
  useEffect(setupRouteHandlers, []);
  useEffect(setupPageHandlers, []);
  return props.children;
}

UserTimingReporter.defaultProps = {
  children: null,
};
