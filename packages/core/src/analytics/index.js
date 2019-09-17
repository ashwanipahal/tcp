// export { default as ClickTracker } from "./ClickTracker";

// export { default as PageViewTracker } from "./PageViewTracker";

export { TRACK_PAGE_VIEW, TRACK_CLICK } from './actions';

export { default as dataLayer } from './dataLayer';

export { trackPageView, trackClick, trackServiceResponse } from './events';

export { usePageTracking, useClickTracking } from './hooks';
