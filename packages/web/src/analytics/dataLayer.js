import { readCookie } from '@tcp/core/src/utils/cookie.util';
import { API_CONFIG } from '@tcp/core/src/services/config';
import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import {
  generateBrowseDataLayer,
  generateHomePageDataLayer,
  generateClickHandlerDataLayer,
} from './dataLayers';

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
  const homepageDataLayer = generateHomePageDataLayer(store);
  const clickHandlerDataLayer = generateClickHandlerDataLayer(store);
  const siteType = 'global site';
  const { pageCountCookieKey } = API_CONFIG;
  const getStatePropValue = propName => {
    const { pageData, AnalyticsDataKey } = store.getState();
    const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
    const propValue = clickActionAnalyticsData[propName]
      ? clickActionAnalyticsData[propName]
      : pageData[propName];

    return propValue || '';
  };

  return Object.create(defaultDataLayer, {
    ...browseDataLayer,
    ...homepageDataLayer,
    ...clickHandlerDataLayer,
    pageCount: {
      get() {
        return readCookie(pageCountCookieKey);
      },
    },
    pageName: {
      get() {
        /* If clickActionAnalyticsData has pageName then this will be used else
           pageName will used from pageData. This is usually require when on some event you need
           to override the pageName value. For instance, onClick event.
         */
        const { pageData, AnalyticsDataKey } = store.getState();
        // We need both the default object and || fallback because Immutable only defaults for `undefined` and not `null`
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        const pageName = clickActionAnalyticsData.pageName
          ? clickActionAnalyticsData.pageName
          : pageData.pageName;

        return `gl:${pageName}`;
      },
    },
    orderId: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.orderId
          ? clickActionAnalyticsData.orderId
          : pageData.orderId;
      },
    },
    paymentMethod: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.paymentMethod
          ? clickActionAnalyticsData.paymentMethod
          : pageData.paymentMethod;
      },
    },
    billingCountry: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.billingCountry
          ? clickActionAnalyticsData.billingCountry
          : pageData.billingCountry;
      },
    },
    billingZip: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.billingZip
          ? clickActionAnalyticsData.billingZip
          : pageData.billingZip;
      },
    },
    orderSubtotal: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.orderSubtotal
          ? clickActionAnalyticsData.orderSubtotal
          : pageData.orderSubtotal;
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

        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        const pageShortName = clickActionAnalyticsData.pageShortName
          ? clickActionAnalyticsData.pageShortName
          : pageData.pageShortName;
        const pageName = clickActionAnalyticsData.pageName
          ? clickActionAnalyticsData.pageName
          : pageData.pageName;
        return `${pageShortName || pageName}`;
      },
    },

    pageType: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        const pageType = clickActionAnalyticsData.pageType
          ? clickActionAnalyticsData.pageType
          : pageData.pageType;
        const pageName = clickActionAnalyticsData.pageName
          ? clickActionAnalyticsData.pageName
          : pageData.pageName;
        return `${pageType || pageName}`;
      },
    },
    pageUrl: {
      get() {
        return `https://${document.location.hostname}${document.location.pathname}`;
      },
    },

    countryId: {
      get() {
        return store.getState().APIConfig.storeId;
      },
    },

    pageLocale: {
      get() {
        return 'US:en';
      },
    },

    pageSection: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return clickActionAnalyticsData && clickActionAnalyticsData.pageSection
          ? clickActionAnalyticsData.pageSection
          : pageData.pageSection;
      },
    },

    pageSubSubSection: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return clickActionAnalyticsData.pageSubSection
          ? clickActionAnalyticsData.pageSubSection
          : pageData.pageSubSection;
      },
    },

    pageTertiarySection: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return clickActionAnalyticsData.pageTertiarySection
          ? clickActionAnalyticsData.pageTertiarySection
          : pageData.pageTertiarySection;
      },
    },

    siteType: {
      get() {
        return siteType;
      },
    },

    customerType: {
      get() {
        return getUserLoggedInState(store.getState()) ? 'no rewards:logged in' : 'no rewards:guest';
      },
    },

    checkoutType: {
      get() {
        const { pageType = '' } = store.getState().pageData;
        let userType = '';
        if (pageType === 'checkout') {
          userType = store
            .getState()
            .User.get('personalData')
            .get('isGuest')
            ? 'guest'
            : 'registered';
        }
        return userType;
      },
    },

    userEmailAddress: {
      get() {
        return store.getState().User.getIn(['personalData', 'contactInfo', 'emailAddress'], '');
      },
    },

    currencyCode: {
      get() {
        return store.getState().session.siteDetails.currency.toUpperCase();
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

    productId: {
      get() {
        return getStatePropValue('productId');
      },
    },

    pageNavigationText: {
      get() {
        return getStatePropValue('pageNavigationText');
      },
    },

    // TODO: This formatting logic needs to match current app
    listingCount: {
      get() {
        const { AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return (
          clickActionAnalyticsData.listingCount ||
          store.getState().ProductListing.get('totalProductsCount')
        );
      },
    },
    cartType: {
      get() {
        const { pageType = '' } = store.getState().pageData;
        let typeCart = '';
        if (pageType === 'checkout') {
          const orderDetails = store.getState().CartPageReducer.get('orderDetails');
          typeCart = 'standard';
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
        }
        return typeCart;
      },
    },
    products: {
      get() {
        const { AnalyticsDataKey, pageData } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};

        const pageProducts = clickActionAnalyticsData.products
          ? clickActionAnalyticsData.products
          : pageData.products;

        return pageProducts || [];
      },
    },

    currentState: {
      get() {
        return store.getState();
      },
    },

    storeId: {
      get() {
        const currentState = store.getState();
        return currentState.User.getIn(['personalData', 'hobbies'], '');
      },
    },
    brandId: {
      get() {
        const { brandId = '' } = store.getState().APIConfig;
        return brandId.toUpperCase();
      },
    },
    landingSiteBrandId: {
      get() {
        const { landingSite } = API_CONFIG;
        return readCookie(landingSite) || '';
      },
    },
  });
}
