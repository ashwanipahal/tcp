import { put, takeLatest } from 'redux-saga/effects';
import { trackClick } from '@tcp/core/src/analytics/actions';
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
      createAccountGen.next();
      createAccountGen.next();
      createAccountGen.next();
    });

    it('should dispatch getUserInfo action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      createAccountGen.next(response);
      createAccountGen.next();
      createAccountGen.next(response);
      const putDescriptor = createAccountGen.next().value;
      expect(putDescriptor).toEqual(put(getUserInfo()));
    });

    it('should dispatch trackClick action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };

      const data = {
        module: 'account',
        name: 'user_register',
      };

      createAccountGen.next(response);
      createAccountGen.next();
      createAccountGen.next();
      createAccountGen.next();
      createAccountGen.next(response);
      const putDescriptor = createAccountGen.next().value;
      expect(putDescriptor).toEqual(put(trackClick(data)));
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
      createAccountGen.next(response);
      createAccountGen.next();
      const putDescriptor1 = createAccountGen.next(response).value;
      expect(putDescriptor1).toEqual(put(createAccountErr({ errorMessage: 'foo' })));
    });

    it('should dispatch createAccountErr action for error', () => {
      const error = {
        errorMessage: 'foo',
        errorCode: 'foo',
      };
      createAccountGen.throw(error);
      createAccountGen.next();
      expect(createAccountGen.next().value).toEqual(
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
