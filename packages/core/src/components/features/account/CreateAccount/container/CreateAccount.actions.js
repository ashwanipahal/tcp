import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';

export const createAccount = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT,
  payload,
});

export const createAccountErr = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT_ERR,
  payload,
});
