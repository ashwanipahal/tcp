import { createSelector } from 'reselect';
import { getErrorSelector } from '../../../../../../utils/utils';

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
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_paymentGC_error');
  }
);
