import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView, trackClick } from '@tcp/core/src/analytics';

export default function(action) {
  switch (action.type) {
    case TRACK_PAGE_VIEW:
      return trackPageView();
    case TRACK_CLICK:
      return trackClick();
    // For debugging in Redux dev tools
    case 'TEST_TRACKING':
      return () => ({ hitType: 'test' });
    default:
      return [];
  }
}
