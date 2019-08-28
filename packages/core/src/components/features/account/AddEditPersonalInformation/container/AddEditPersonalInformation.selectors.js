import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { UPDATE_PROFILE_REDUCER_KEY } from '../../../../../constants/reducer.constants';

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
  const selector = formValueSelector('AddEditPersonalInformationForm');
  return selector(state, 'isEmployee');
};
