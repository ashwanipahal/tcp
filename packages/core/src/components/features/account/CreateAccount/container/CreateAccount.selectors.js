import { formValueSelector } from 'redux-form';

export const getIAgree = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'iAgree');
};

export const getHideShowPwd = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'hideShowPwd');
};

export const getConfirmHideShowPwd = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'confirmHideShowPwd');
};

export const getError = state => {
  return state.CreateAccountReducer.get('error');
};

export const getLabels = state => {
  return state.Labels.account;
};
