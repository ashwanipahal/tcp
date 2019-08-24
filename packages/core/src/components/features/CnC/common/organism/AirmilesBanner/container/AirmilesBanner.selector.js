export const getCollectorNumber = state => {
  return state.CartPageReducer.getIn(['userDetails', 'collectorNumber']) || 0;
};
export const getOfferCode = state => {
  return state.CartPageReducer.getIn(['userDetails', 'promoOffer']) || 0;
};
export const getAirmilesBannerData = state => {
  return {
    collectorNumber: getCollectorNumber(state),
    offerCode: getOfferCode(state),
  };
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
  };
};
