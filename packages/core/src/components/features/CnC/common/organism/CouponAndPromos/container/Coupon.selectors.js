const getCouponFetchingState = state => {
  return state.CouponsAndPromos.get('isFetching');
};
export default getCouponFetchingState;
