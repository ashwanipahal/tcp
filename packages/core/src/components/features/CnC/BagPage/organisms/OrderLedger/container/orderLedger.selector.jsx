export const getItemsTotalCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']);
};
export const getCouponsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'couponsTotal']);
};
export const getSavingsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'savingsTotal']);
};
export const getShippingTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'shippingTotal']);
};
export const getTotalTax = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totaltax']);
};
export const getGrandTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'grandTotal']);
};
export const getGiftCardsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'giftCardsTotal']);
};
export const getTotalOrderSavings = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalOrderSavings']);
};
export const getSubTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'subTotal']);
};
