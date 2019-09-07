import { BIRTHDAY_SAVING_LIST_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { getLabelValue } from '@tcp/core/src/utils';
import { getProfileLabels } from '../../../../BirthdaySavingsPage/container/BirthdaySavingsPage.selectors';

/**
 * Selector function to retur redux BirthdaySavingListState
 * @param { object } state reduxStore state
 */
export const getBirthdaySavingListState = state => state && state[BIRTHDAY_SAVING_LIST_REDUCER_KEY];

/**
 * Selector function to return redux BirthdaySavingList Success state
 * @param { object } state reduxStore state
 */
export const getSuccessState = createSelector(
  getBirthdaySavingListState,
  birthdayState => birthdayState.get('success')
);

/**
 * Selector function to return redux BirthdaySavingList error state
 * @param { object } state reduxStore state
 */
export const getErrorState = createSelector(
  getBirthdaySavingListState,
  birthdayState => birthdayState.get('error')
);

/**
 * Selector function to return redux BirthdaySavingList notification status
 * @param { object } state reduxStore state
 */
export const getStatus = createSelector(
  [getSuccessState, getErrorState],
  (success, error) => {
    if (success) {
      return 'success';
    }

    if (error) {
      return 'error';
    }

    return '';
  }
);

/**
 * Selector function to return redux BirthdaySavingList notification message
 * @param { object } state reduxStore state
 */
export const getMessage = createSelector(
  [getSuccessState, getErrorState, getProfileLabels],
  (success, error, labels) => {
    if (success) {
      return getLabelValue(labels, 'lbl_profile_removeBirthdaySuccess');
    }

    if (error) {
      const errorCode = Map.isMap(error) ? error.get('errorCode') : error.errorCode;
      return getLabelValue(
        labels,
        errorCode ? `lbl_profile_${errorCode}` : 'lbl_profile_genericError'
      );
    }

    return '';
  }
);
