import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import constants from '../TrackOrder.constants';

export const getLabels = state => state.Labels.global;

export const getTrackOrderState = state => state.TrackOrderReducer.get('trackOrderInfo');

export const getErrorMessage = state => state.TrackOrderReducer.get('showNotificationOnModal');

export const getTrackOrderMountedState = state => {
  return state.TrackOrderReducer.get('trackOrderMountedState');
};

export const getEmailId = state => {
  const selector = formValueSelector(constants.TRACK_ORDER_FORM_NAME);
  return selector(state, 'emailAddress');
};

export const getOrderId = state => {
  const selector = formValueSelector(constants.TRACK_ORDER_FORM_NAME);
  return selector(state, 'orderNumber');
};

export const getOrderDetail = state => {
  return state.TrackOrderReducer.get('trackOrderInfo');
};

export const getShowNotificationState = createSelector(
  getTrackOrderState,
  trackOrderState => {
    return trackOrderState && trackOrderState.success ? 'success' : 'error';
  }
);
