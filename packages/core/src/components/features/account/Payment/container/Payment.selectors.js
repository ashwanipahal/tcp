import { createSelector } from 'reselect';

export const getCardListState = state => {
  return state.PaymentReducer.get('cardList');
};

export const getPaymentReferedContent = state => {
  return state.PaymentReducer.get('paymentLabels') ? state.PaymentReducer.get('paymentLabels') : {};
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

export const getPaymentBannerContentId = createSelector(
  [getPaymentReferedContent],
  labels => {
    // TO DO - Change the condition with appropirate banner label name
    let paymentBannerContentId = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
    if (Array.isArray(labels.referred)) {
      labels.referred.forEach(label => {
        if (label.name === 'payment-banner-label') paymentBannerContentId = label.cid;
      });
    }
    return paymentBannerContentId;
  }
);

export const getPaymentBannerRichTextSelector = state => {
  return state.PaymentReducer.get('paymentBannerRichText');
};
