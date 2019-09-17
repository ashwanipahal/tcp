import { TRACK_PAGE_VIEW, trackPageView } from '@tcp/core/src/analytics';

export default function(action) {
  switch (action.type) {
    case TRACK_PAGE_VIEW:
      return trackPageView();
    // For debugging in Redux dev tools
    case 'TEST_TRACKING':
      return () => ({ hitType: 'test' });
    default:
      return [];
  }
}
