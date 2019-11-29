import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView, trackClick } from '@tcp/core/src/analytics';

export const eventMapping = {
  [TRACK_PAGE_VIEW]: trackPageView(),
  [TRACK_CLICK]: trackClick(),
};
