import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';

export const createAccount = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT,
  payload,
});

export const createAccountErr = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT_ERR,
  payload,
});

export const resetCreateAccountErr = () => ({
  type: CREATE_ACCOUNT_CONSTANTS.RESET_CREATE_AN_ACCOUNT_ERR,
});

export const setLoadingState = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.SET_LOADING_STATE,
  payload,
});
