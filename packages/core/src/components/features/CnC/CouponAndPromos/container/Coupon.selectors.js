export const getAppliedCouponListState = state => {
  const list = state.CouponsAndPromos.get('couponsAndOffers');
  return list.filter(i => i.status === 'applied');
};

export const getAvailableCouponListState = state => {
  const list = state.CouponsAndPromos.get('couponsAndOffers');
  return list.filter(i => i.status === 'available');
};

export const getCouponListFetchingState = state => {
  return state.CouponsAndPromos.get('isFetching');
};
