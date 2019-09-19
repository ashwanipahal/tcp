import { createSelector } from 'reselect';
import { POINTS_CLAIM_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getErrorSelector } from '../../../../../utils';

const getState = state => state[POINTS_CLAIM_REDUCER_KEY];

export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export const getShowNotificationState = createSelector(
  getState,
  resp => resp && resp.get('showNotification')
);

export const getLabels = state => state.Labels.account;

export const getPlaceRewardsLabels = createSelector(
  getLabels,
  labels => labels && labels.myPlaceRewards
);

export const getPointsClaimErrorMessage = createSelector(
  [getError, getPlaceRewardsLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_points_claim_error');
  }
);
