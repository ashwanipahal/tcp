import { BIRTHDAY_SAVING_LIST_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

export const getBirthdaySavingListState = state => state && state[BIRTHDAY_SAVING_LIST_REDUCER_KEY];

export const getSuccessState = createSelector(
  getBirthdaySavingListState,
  birthdayState => birthdayState.get('success')
);

export const getErrorState = createSelector(
  getBirthdaySavingListState,
  birthdayState => birthdayState.get('error')
);

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

export const getMessageKey = createSelector(
  [getSuccessState, getErrorState],
  (success, error) => {
    if (success) {
      return 'lbl_profile_removeBirthdaySuccess';
    }

    if (error) {
      return error.get('errorCode')
        ? `lbl_profile_${error.get('errorCode')}`
        : 'lbl_profile_genericError';
    }

    return '';
  }
);
