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

const getShowAddGiftCard = state => {
  return state.Checkout.getIn(['values', 'showAddGiftCard']) || false;
};

const getAddGiftCardErrors = state => {
  return state.Checkout.getIn(['values', 'addGiftCardError']);
};

const getAddGiftCardResponse = state => {
  return state.Checkout.getIn(['values', 'addGiftCardResponse']);
};

const getIsRecapchaEnabled = state => {
  return (
    (state.session && state.session.siteDetails && state.session.siteDetails.isRecapchaEnabled) ||
    true
  );
};
export default {
  getGrandTotal,
  getAppliedGiftCards,
  getGiftCardsTotal,
  getGiftSectionLabels,
  getGiftCardErrors,
  getShowAddGiftCard,
  getAddGiftCardErrors,
  getIsRecapchaEnabled,
  getAddGiftCardResponse,
};
