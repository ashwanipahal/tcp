const getAnalyticsData = store => {
  const state = store.getState();
  return state.AnalyticsDataKey && state.AnalyticsDataKey.get('clickActionAnalyticsData');
};

const getCustomEvents = store => {
  const defaultData = getAnalyticsData(store);
  return defaultData && defaultData.customEvents;
};

const getProductsData = store => {
  const defaultData = getAnalyticsData(store);
  return defaultData && defaultData.products;
};

const getEventName = store => {
  const defaultData = getAnalyticsData(store);
  return defaultData && defaultData.eventName;
};

const getCouponCode = store => {
  const defaultData = getAnalyticsData(store);
  return defaultData && defaultData.couponCode;
};

const getSocialNetwork = store => {
  const defaultData = getAnalyticsData(store);
  return defaultData && defaultData.socialNetwork;
};

export const generateClickHandlerDataLayer = store => {
  return {
    eventData: {
      get() {
        return {
          customEvents: getCustomEvents(store) || '',
          products: getProductsData(store) || '',
          eventName: getEventName(store) || '',
          couponCode: getCouponCode(store) || '',
          socialNetwork: getSocialNetwork(store) || '',
        };
      },
    },
  };
};

export default generateClickHandlerDataLayer;
