import { createSelector } from 'reselect';
import { APPLY_PLCC_REDUCER_KEY } from '../../../../../constants/reducer.constants';

/**
 * @constant getApplyRewardsCreditCardContent
 *
 * @param {state} state
 */
export const getApplyRewardsCreditCardContent = state => {
  return state[APPLY_PLCC_REDUCER_KEY];
};

/**
 * @constant getStatus
 *
 * @param {state} state
 */
export const getStatus = state => {
  return state[APPLY_PLCC_REDUCER_KEY];
};

/**
 * @constant getCreditCardContent
 * @responsibiltiy - @selector
 *
 * @description - fetching plcc disclaimers data through modules x
 *
 */
export const getCreditCardContent = createSelector(
  getApplyRewardsCreditCardContent,
  state => state && state.get('plcc_disclaimers_data')
);

/**
 * @constant getPLCCApplicationStatus
 * @responsibiltiy - @selector
 *
 * @description - fetching applied PLCC card status.
 *
 */
export const getPLCCApplicationStatus = createSelector(
  getStatus,
  state => state && state.get('applicationStatus')
);
