import { createSelector } from 'reselect';

export const getCardListState = state => {
  return state.PaymentReducer.get('cardList');
};

export const getCreditDebitCards = createSelector(
  [getCardListState],
  creditCardList =>
    creditCardList &&
    creditCardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO')
);

export const getGiftCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'GiftCard')
);

export const getVenmoCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'VENMO')
);

export const getCreditCardDefault = createSelector(
  [getCardListState],
  creditCardList =>
    creditCardList &&
    creditCardList.filter(
      card => card.defaultInd === true && card.ccType !== 'VENMO' && card.ccType !== 'GiftCard'
    )
);

export const getMyPlaceRewardCreditCard = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'PLACE CARD')
);

export const getCardListFetchingState = state => {
  return state.PaymentReducer.get('isFetching');
};

export const getShowNotificationState = state => {
  return state.PaymentReducer.get('showNotification');
};

export const getShowNotificationCaptchaState = state => {
  return state.PaymentReducer.get('showNotificationCaptcha');
};

export const deleteModalOpenState = state => {
  return state.PaymentReducer.get('deleteModalMountedState');
};

export const showUpdatedNotificationOnModalState = state => {
  return state.PaymentReducer.get('showUpdatedNotificationOnModal');
};

export const checkbalanceValue = state => {
  return state.PaymentReducer.get('giftcardBalance');
};

export const getPaymentBannerContentId = state => {
  let paymentBannerContentId;
  if (state.Labels.account.paymentGC && Array.isArray(state.Labels.account.paymentGC.referred)) {
    state.Labels.account.paymentGC.referred.forEach(label => {
      if (label.name === 'paymentGCTopBanner') paymentBannerContentId = label.contentId;
    });
  }
  return paymentBannerContentId;
};

export const getPaymentBannerRichTextSelector = state => {
  return state.PaymentReducer.get('paymentBannerRichText');
};

export const getLabels = state => state.Labels.account;
