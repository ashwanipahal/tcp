import { createSelector } from 'reselect';
import { ACCOUNTHEADER_REDUCER_KEY } from '../../../../../../../constants/reducer.constants';

export const getAccountHeaderState = state => {
  return state[ACCOUNTHEADER_REDUCER_KEY];
};

export const getRewardsPointsBannerContent = createSelector(
  getAccountHeaderState,
  state => state && state.get('rewardsPointsBannerContent')
);
