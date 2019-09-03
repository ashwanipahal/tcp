function track(fn, ...args) {
  /* eslint-disable no-underscore-dangle */
  if (window._dataManager && typeof window._dataManager[fn] === 'function') {
    window._dataManager[fn](...args);
  }
  /* eslint-enable */
  console.log('Tracking', fn, ...args);
}

export function trackPage(...args) {
  track('init', ...args);
}

export default {
  trackPage,
};
