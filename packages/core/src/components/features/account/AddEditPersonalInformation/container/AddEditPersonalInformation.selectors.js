import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { getErrorSelector } from '../../../../../utils/utils';
import { UPDATE_PROFILE_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import AddEditPersonalInfoConstants from '../AddEditPersonalInformation.constants';

const getState = state => state[UPDATE_PROFILE_REDUCER_KEY];

export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export const getProfileLabels = state => {
  return (state && state.Labels.account.profile) || {};
};

export const getIsEmployee = state => {
  const selector = formValueSelector(AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM);
  return selector(state, 'isEmployee');
};

export const getPersonalInfoErrorResponse = state => {
  return state[UPDATE_PROFILE_REDUCER_KEY].get('error');
};

export const getPersonalInfoErrorMessage = createSelector(
  [getPersonalInfoErrorResponse, getProfileLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_profile');
  }
);
