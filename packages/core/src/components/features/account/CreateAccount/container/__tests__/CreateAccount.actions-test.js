import CREATE_ACCOUNT_CONSTANTS from '../../CreateAccount.constants';
import createAccount from '../CreateAccount.actions';

describe('Create Account actions', () => {
  it('createAccount should return action type as createAccount', () => {
    expect(createAccount().type).toBe(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT);
  });
});
