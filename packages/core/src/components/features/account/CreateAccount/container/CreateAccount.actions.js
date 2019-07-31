import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';

const createAccount = payload => ({
  type: CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT,
  payload,
});

export default createAccount;
