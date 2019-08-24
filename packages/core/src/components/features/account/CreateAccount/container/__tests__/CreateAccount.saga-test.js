import { put, takeLatest } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../../CreateAccount.constants';
import { CreateAccountSaga, createsaga } from '../CreateAccount.saga';
import { getUserInfo } from '../../../User/container/User.actions';

describe('Create Account Saga', () => {
  describe('createAccount', () => {
    let createAccountGen;
    const payload = {
      firstName: 'firstName',
      lastName: 'lastName',
      logonId: 'emailAddress',
      logonPassword: 'password',
      phone1: 123344,
      rememberCheck: false,
      rememberMe: false,
      zipCode: 21211,
    };
    beforeEach(() => {
      createAccountGen = createsaga({ payload });
      createAccountGen.next();
    });

    it('should dispatch getUserInfo action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const putDescriptor = createAccountGen.next(response).value;
      expect(putDescriptor).toEqual(put(getUserInfo()));
    });
  });
  describe('deleteAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = CreateAccountSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT, createsaga)
      );
    });
  });
});
