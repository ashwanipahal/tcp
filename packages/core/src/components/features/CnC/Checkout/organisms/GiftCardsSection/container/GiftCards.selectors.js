import { getLabelValue } from '../../../../../../../utils';

const getGiftSectionLabels = state => {
  return state.Labels.checkout.billing;
};

const getGiftCardSectionLabels = state => {
  const getGiftSectionLabelValue = label =>
    getLabelValue(state.Labels, label, 'billing', 'checkout');
  return {
    giftCardAddUpToMsg: getGiftSectionLabelValue('lbl_giftcard_addUptoMsg'),
    giftCardTitle: getGiftSectionLabelValue('lbl_giftcard_title'),
    giftCardHeadsUpMsg: getGiftSectionLabelValue('lbl_giftcard_headsUpMsg'),
    giftCardHeadsUpTitle: getGiftSectionLabelValue('lbl_giftcard_headsUpTitle'),
    newGiftCard: getGiftSectionLabelValue('lbl_giftcard_newGiftCard'),
    availableGiftCards: getGiftSectionLabelValue('lbl_giftcard_availableCards'),
    appliedGiftCards: getGiftSectionLabelValue('lbl_giftcard_appliedCards'),
  };
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
    state.session &&
    state.session.siteDetails &&
    state.session.siteDetails.GIFT_CARD_RECAPTCHA_ENABLED
  );
};

const getIsLoading = state => {
  return state.Checkout.getIn(['uiFlags', 'isLoadingShippingMethods']);
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
  getIsLoading,
  getGiftCardSectionLabels,
};
