import { createSelector } from 'reselect';

export const getLabels = state => {
  return state.Labels.account;
};

export const getGlobalLabels = state => {
  return state.Labels && state.Labels.global;
};

export const getCommonLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.common;
};

export const getAccountNavigationState = state => {
  return state.AccountReducer.get('accountNavigation');
};

export const getAccountNavigationFetchingState = state => {
  return state.AccountReducer.get('isFetching');
};

export const getErrorMessages = state => {
  return state.Labels.global;
};

export const getFormValidationErrorMessages = createSelector(
  [getErrorMessages, getLabels],
  (global, account) => {
    return { ...global.formValidation, ...account.myPlaceRewards };
  }
);
