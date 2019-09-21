import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';

/**
 * Analytics data layer object for property lookups.
 *
 * This function will create an object for the analytics
 * script to reference when mapping data elements. This
 * object should be assigned to the global context
 * (e.g., window) for easy access.
 *
 * @example
 * // In the app source
 * global._dataLater = create(store);
 * // In the analytics script
 * _dataLater.pageName; // "gl:home"
 *
 * @param {Object} store reference to the Redux store
 * @returns {Object} data layer
 */
export default function create(store) {
  return Object.create(defaultDataLayer, {
    pageName: {
      get() {
        return store.getState().pageName;
      },
    },
    // TODO: This formatting logic needs to match current app
    listingFilterList: {
      get() {
        const { form: { 'filter-form': { values } = {} } = {} } = store.getState();
        const { TCPColor_uFilter: color, v_tcpsize_uFilter: size } = values;
        return color || size ? JSON.stringify({ color, size }) : '';
      },
    },
    listingCount: {
      get() {
        return store.getState().ProductListing.get('totalProductsCount');
      },
    },
    listingCategory: {
      get() {
        return store.getState().ProductListing.get('currentListingId');
      },
    },
  });
}
