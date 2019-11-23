import { readCookie } from '@tcp/core/src/utils/cookie.util';
import { API_CONFIG } from '@tcp/core/src/services/config';
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
  const siteType = 'global site';
  return Object.create(defaultDataLayer, {
    pageName: {
      get() {
        /* If clickActionAnalyticsData has pageName then this will be used else
           pageName will used from pageData. This is usually require when on some event you need
           to override the pageName value. For instance, onClick event.
         */
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        const pageName =
          clickActionAnalyticsData && clickActionAnalyticsData.pageName
            ? clickActionAnalyticsData.pageName
            : pageData.pageName;

        return `gl:${pageName || ''}`;
      },
    },

    isCurrentRoute: () => false,

    pageShortName: {
      get() {
        /* If clickActionAnalyticsData has pageShortName then this will be used else
           pageShortName will used from pageData. Also if pageShortName is not available then pageName will
           be used. This is usually require when on some event you need
           to override the pageName value. For instance, onClick event.
         */
        const { pageData, AnalyticsDataKey } = store.getState();

        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        const pageShortName =
          clickActionAnalyticsData && clickActionAnalyticsData.pageShortName
            ? clickActionAnalyticsData.pageShortName
            : pageData.pageShortName;
        const pageName =
          clickActionAnalyticsData && clickActionAnalyticsData.pageName
            ? clickActionAnalyticsData.pageName
            : pageData.pageName;
        return `gl:${pageShortName || pageName}`;
      },
    },

    pageType: {
      get() {
        const { pageData } = store.getState();
        return pageData.pageType ? pageData.pageType : pageData.pageName;
      },
    },

    countryId: {
      get() {
        return store.getState().APIConfig.storeId;
      },
    },

    storeId: {
      get() {
        return store.getState().APIConfig.storeId;
      },
    },

    pageLocale: {
      get() {
        return `${store.getState().APIConfig.country}:${store.getState().APIConfig.language}`;
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
        return siteType;
      },
    },

    customerType: {
      get() {
        return store.getState().User.getIn(['personalData', 'isGuest'])
          ? 'no rewards:guest'
          : 'no rewards:logged in';
      },
    },

    checkoutType: {
      get() {
        return store
          .getState()
          .User.get('personalData')
          .get('isGuest')
          ? 'guest'
          : 'registered';
      },
    },

    userEmailAddress: {
      get() {
        return store.getState().User.getIn(['personalData', 'contactInfo', 'emailAddress'], '');
      },
    },

    pageDate: {
      get() {
        return new Date().toISOString().split('T')[0];
      },
    },

    customerId: {
      get() {
        return store.getState().User.getIn(['personalData', 'userId'], '');
      },
    },

    currencyCode: {
      get() {
        const { currency = '' } = store.getState().APIConfig;
        return currency.toUpperCase();
      },
    },

    customerFirstName: {
      get() {
        return store.getState().User.getIn(['personalData', 'contactInfo', 'firstName'], '');
      },
    },

    customerLastName: {
      get() {
        return store.getState().User.getIn(['personalData', 'contactInfo', 'lastName'], '');
      },
    },

    pageNavigationText: {
      get() {
        return store
          .getState()
          .AnalyticsDataKey.getIn(['clickActionAnalyticsData', 'pageNavigationText'], '');
      },
    },

    // TODO: This formatting logic needs to match current app
    listingCount: {
      get() {
        return store.getState().ProductListing.get('totalProductsCount');
      },
    },
    cartType: {
      get() {
        const orderDetails = store.getState().CartPageReducer.get('orderDetails');
        let typeCart = 'standard';
        const isBopisOrder = orderDetails.get('isBopisOrder');
        const isBossOrder = orderDetails.get('isBossOrder');
        const isPickupOrder = orderDetails.get('isPickupOrder');
        const isShippingOrder = orderDetails.get('isShippingOrder');
        if (isShippingOrder && (isBopisOrder || isBossOrder || isPickupOrder)) {
          typeCart = 'mix';
        } else if (isBopisOrder && !isBossOrder) {
          typeCart = 'bopis';
        } else if (isBossOrder && !isBopisOrder) {
          typeCart = 'boss';
        }
        return typeCart;
      },
    },
    products: {
      get() {
        return store
          .getState()
          .AnalyticsDataKey.getIn(['clickActionAnalyticsData', 'products'], '');
      },
    },
  });
}
