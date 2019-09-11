import { getFormSyncErrors, formValueSelector } from 'redux-form';

export const getCollectorNumber = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'airmiles', 'accountNumber']) || '';
};

export const getOfferCode = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'airmiles', 'promoId']) || '';
};
export const getCartOrderDetails = state => {
  return state.CartPageReducer.get('orderDetails');
};

export const getCartOrderId = state => {
  return getCartOrderDetails(state).get('orderId');
};
export const getAirmilesBannerData = state => {
  return {
    collectorNumber: getCollectorNumber(state),
    offerCode: getOfferCode(state),
  };
};

export const getSyncError = state => {
  return {
    syncError: getFormSyncErrors('AirmilesBanner')(state),
  };
};

export const getFormAirmilesNumber = state => {
  const selector = formValueSelector('AirmilesBanner');
  return selector(state, 'promoId');
};
export const getFormAirmilesOfferCode = state => {
  const selector = formValueSelector('AirmilesBanner');
  return selector(state, 'offerCode');
};
export const getAirmilesBannerLabels = state => {
  const {
    global: {
      airmilesBanner: {
        lbl_airmilesBanner_collectorNumber: collectorNumber,
        lbl_airmilesBanner_offerCode: offerCode,
        lbl_airmilesBanner_headerText: headerText,
        lbl_airmilesBanner_footerText: footerText,
        lbl_airmilesBanner_collectorFlyout: collectorFlyout,
        lbl_airmilesBanner_offerFlyout: offerFlyout,
        lbl_airmilesBanner_exactLength: exactLength,
        lbl_airmilesBanner_collectorOnlyNumber: collectorOnlyNumber,
      },
    },
  } = state.Labels;

  return {
    collectorNumber,
    offerCode,
    headerText,
    footerText,
    collectorFlyout,
    offerFlyout,
    exactLength,
    collectorOnlyNumber,
  };
};
