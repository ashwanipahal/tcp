import { createSelector } from 'reselect';
import { getErrorSelector } from '@tcp/core/src/utils/utils';
import { POINTS_CLAIM_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getState = state => state[POINTS_CLAIM_REDUCER_KEY];

/**
 * Selector function to return redux error
 * @param { object } state reduxStore state
 */
export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

/**
 * Selector function to return redux success
 * @param { object } state reduxStore state
 */
export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

/**
 * Selector function to return redux showNotification
 * @param { object } state reduxStore state
 */
export const getShowNotificationState = createSelector(
  getState,
  resp => resp && resp.get('showNotification')
);

/**
 * Selector function to return redux label
 * @param { object } state reduxStore state
 */
export const getLabels = state => state.Labels.account;

/**
 * Selector function to return redux myPlaceRewards label
 * @param { object } state reduxStore state
 */
export const getPlaceRewardsLabels = createSelector(
  getLabels,
  labels => labels && labels.myPlaceRewards
);

/**
 * Selector function to return redux errormessage
 * @param { object } state reduxStore state
 */
export const getPointsClaimErrorMessage = createSelector(
  [getError, getPlaceRewardsLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_points_claim_error');
  }
);
