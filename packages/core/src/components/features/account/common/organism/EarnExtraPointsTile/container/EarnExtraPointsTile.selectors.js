import { createSelector } from 'reselect';
import { EARNEXTRAPOINTS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[EARNEXTRAPOINTS_REDUCER_KEY];

export const getCommonLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.common;
};

export const getEarnExtraPointsLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.earnExtraPoints;
};

export const getEarnExtraPointsDataState = createSelector(
  getState,
  state => state && state.get('earnExtraPointsData')
);

export const getEarnedPointsNotificationState = createSelector(
  getState,
  state => state && state.get('earnedPointsNotificationData')
);

export const getEarnExtraPointsFetchingState = createSelector(
  getState,
  state => state && state.get('isFetching')
);
