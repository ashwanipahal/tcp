import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { generateClickHandlerDataLayer } from './dataLayers';

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
  const clickHandlerDataLayer = generateClickHandlerDataLayer(store);
  return Object.create(defaultDataLayer, {
    ...clickHandlerDataLayer,
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
    orderSubtotal: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData');
        return clickActionAnalyticsData && clickActionAnalyticsData.orderSubtotal
          ? clickActionAnalyticsData.orderSubtotal
          : pageData.orderSubtotal;
      },
    },
    billingCountry: {
      get() {
        return 'us';
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
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return clickActionAnalyticsData.pageType
          ? clickActionAnalyticsData.pageType
          : pageData.pageType;
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

    pageSubSection: {
      get() {
        const { pageData, AnalyticsDataKey } = store.getState();
        const clickActionAnalyticsData = AnalyticsDataKey.get('clickActionAnalyticsData', {}) || {};
        return clickActionAnalyticsData.pageSubSection
          ? clickActionAnalyticsData.pageSubSection
          : pageData.pageSubSection;
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
        return 'USD';
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
