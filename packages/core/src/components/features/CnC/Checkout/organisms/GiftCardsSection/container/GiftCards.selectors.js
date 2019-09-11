const getGiftSectionLabels = state => {
  return state.Labels.checkout.billing;
};

const getGrandTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'grandTotal']) || 0;
};

const getAppliedGiftCards = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'appliedGiftCards']);
};

const getGiftCardsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'giftCardsTotal']) || 0;
};

const getGiftCardErrors = state => {
  return state.Checkout.getIn(['values', 'giftCardError']);
};

export default {
  getGrandTotal,
  getAppliedGiftCards,
  getGiftCardsTotal,
  getGiftSectionLabels,
  getGiftCardErrors,
};
