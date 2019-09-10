import { defaultDataLayer } from '@tcp/core/src/constants/analytics.constants';

export function createDataLayer(store) {
  return Object.create(defaultDataLayer, {
    listingCount: {
      enumerable: true,
      get() {
        return store.getState().ProductListing.get('totalProductsCount');
      },
    },
    listingCategory: {
      enumerable: true,
      get() {
        return store.getState().ProductListing.get('currentListingId');
      },
    },
  });
}

export default {
  createDataLayer,
};
