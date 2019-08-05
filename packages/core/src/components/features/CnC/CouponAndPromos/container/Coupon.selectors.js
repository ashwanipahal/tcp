export const getCouponListState = state => {
  return state.CouponsAndPromos.get('couponsAndOffers');
};

export const getCouponListFetchingState = state => {
  return state.CouponsAndPromos.get('isFetching');
};
