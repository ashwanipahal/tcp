import { put, takeLatest } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../../CreateAccount.constants';
import { CreateAccountSaga, createsaga } from '../CreateAccount.saga';
import { getUserInfo } from '../../../User/container/User.actions';
import { createAccountErr } from '../CreateAccount.actions';

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
      createAccountGen.next(response);
      const putDescriptor = createAccountGen.next(response).value;
      expect(putDescriptor).toEqual(put(getUserInfo()));
    });

    it('should dispatch createAccountErr action for failure response', () => {
      const response = {
        body: {
          errors: [
            {
              errorMessage: 'foo',
            },
          ],
        },
      };
      const putDescriptor = createAccountGen.next(response).value;
      expect(putDescriptor).toEqual(put(createAccountErr({ errorMessage: 'foo' })));
    });

    it('should dispatch createAccountErr action for error', () => {
      const error = {
        errorMessage: 'foo',
        errorCode: 'foo',
      };
      expect(createAccountGen.throw(error).value).toEqual(
        put(createAccountErr({ errorCode: 'foo', errorMessage: 'foo' }))
      );
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
