import { createSelector } from 'reselect';
import { FORGOTPASSWORD_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getResetEmailResponse = state => {
  return state[FORGOTPASSWORD_REDUCER_KEY];
};

export const getShowNotificationState = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('showNotification')
);

export const toggleSuccessfulEmailSection = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('toggleSuccessfulEmailSection')
);

export const showCheckEmailSectionState = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('showCheckEmailSection')
);
