import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';
import { generateBrowseDataLayer } from './dataLayers';

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
  const browseDataLayer = generateBrowseDataLayer(store);
  return Object.create(defaultDataLayer, {
    ...browseDataLayer,

    // TODO: All pods to include dataElements here like browseDataLayer and make a global for common one.

    pageName: {
      get() {
        return `gl:${store.getState().pageData.pageName}`;
      },
    },

    pageshortName: {
      get() {
        return store.getState().pageData.pageName;
      },
    },

    countryId: {
      get() {
        return store.getState().APIConfig.storeId;
      },
    },

    pageLocale: {
      get() {
        return `${store.getState().APIConfig.country}:${store.getState().APIConfig.language}`;
      },
    },

    pageType: {
      get() {
        return store.getState().pageData.pageSection;
      },
    },

    pageSection: {
      get() {
        return store.getState().pageData.pageSection;
      },
    },

    pageSubSubSection: {
      get() {
        return store.getState().pageData.pageSection;
      },
    },

    siteType: {
      get() {
        return 'global site';
      },
    },

    customerType: {
      get() {
        return store
          .getState()
          .User.get('personalData')
          .get('isGuest')
          ? 'no rewards:guest'
          : 'rewards member:logged in';
      },
    },

    userEmailAddress: {
      get() {
        return store
          .getState()
          .User.get('personalData')
          .getIn(['contactInfo', 'emailAddress']);
      },
    },

    currencyCode: {
      get() {
        return store.getState().APIConfig.currency;
      },
    },

    pageDate: {
      get() {
        return new Date().toISOString().split('T')[0];
      },
    },

    customerId: {
      get() {
        return store
          .getState()
          .User.get('personalData')
          .get('userId');
      },
    },

    // TODO: This formatting logic needs to match current app
    listingCount: {
      get() {
        return store.getState().ProductListing.get('totalProductsCount');
      },
    },
  });
}
