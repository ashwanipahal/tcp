import { createSelector } from 'reselect';

export const getAddGiftCardResponse = state => {
  return state.AddGiftCardReducer.get('showUpdatedNotification');
};

export const getshowNotification = state => {
  return state.AddGiftCardReducer.get('showNotification');
};

export const getAddGiftCardError = state => {
  return state.AddGiftCardReducer.get('error');
};

export const getOnAddGiftCardPageState = state => {
  return state.AddGiftCardReducer.get('onAddGiftCardPage');
};

export const getLabels = state => state.Labels.account;

export const getAddGiftcardLabels = createSelector(
  getLabels,
  labels => labels && labels.paymentGC
);

export const getAddGiftCardErrorMessage = createSelector(
  [getAddGiftCardError, getAddGiftcardLabels],
  (addGiftState, labels) => {
    const errorParameters = addGiftState && addGiftState.getIn(['errorParameters', '0']);
    const errorCode = addGiftState && addGiftState.get('errorCode');
    if (
      (errorParameters && labels[`lbl_paymentGC_error_${errorParameters}`]) ||
      (errorCode && labels[`lbl_paymentGC_error_${errorCode}`])
    ) {
      if (errorParameters) {
        return labels[`lbl_paymentGC_error_${errorParameters}`];
      }
      return labels[`lbl_paymentGC_error_${errorCode}`];
    }
    return (
      (addGiftState && addGiftState.getIn(['errorMessage', '_error'])) ||
      'labels.lbl_paymentGC_error'
    );
  }
);
