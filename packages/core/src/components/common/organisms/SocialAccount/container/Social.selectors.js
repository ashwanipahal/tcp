import { createSelector } from 'reselect';
import { SOCIAL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getSocialResponse = state => {
  return state[SOCIAL_REDUCER_KEY];
};

export const getsocialDataOnLoadState = createSelector(
  getSocialResponse,
  resp => resp && resp.get('socialDataOnLoad')
);

export const getPointsModal = createSelector(
  getSocialResponse,
  resp => resp && resp.get('pointModalMountState')
);

export const getSocialDataFetchingState = createSelector(
  getSocialResponse,
  resp => resp && resp.get('isFetching')
);
