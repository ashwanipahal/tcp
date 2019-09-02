import { createSelector } from 'reselect';
import { MY_PROFILE_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getState = state => state[MY_PROFILE_REDUCER_KEY];

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export default getSuccess;
