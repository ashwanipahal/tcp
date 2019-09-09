import { createSelector } from 'reselect';

export const getAddGiftCardResponse = state => {
  return state.AddGiftCardReducer.get('showUpdatedNotification');
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
  (loginState, labels) => {
    debugger;
    const errorParameters = loginState && loginState.getIn(['errorParameters', '0']);
    const errorCode = loginState && loginState.get('errorCode');
    if (
      (errorParameters && labels[`lbl_paymentGC_error_${errorParameters}`]) ||
      (errorCode && labels[`lbl_paymentGC_error_${errorCode}`])
    ) {
      if (errorParameters) {
        return labels[`lbl_paymentGC_error_${errorParameters}`];
      }
      return labels[`lbl_paymentGC_error_${errorCode}`];
    }
    return loginState && loginState.getIn(['errorMessage', '_error']);
  }
);
