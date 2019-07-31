import { put, takeLatest } from 'redux-saga/effects';
import { getAccountNavigationList, AccountSaga } from '../container/Account.saga';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { setAccountNavigationList } from '../container/Account.actions';
import ACCOUNT_CONSTANTS from '../Account.constants';

describe('Account Navigation List saga', () => {
  describe('getAccountNavigationList', () => {
    let accountListGen;
    beforeEach(() => {
      accountListGen = getAccountNavigationList();
      accountListGen.next();
      accountListGen.next();
    });
    // TODO - Rewrite Test cases to include Integration testing of Saga and Abstractor
    it('should dispatch setAccountNavigationList action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const {
        body: { contact },
      } = response;
      const putDescriptor = accountListGen.next(contact).value;
      expect(putDescriptor).toEqual(put(setAccountNavigationList(response.body.contact)));
    });

    it('should not dispatch setAccountNavigationList action for error', () => {
      const error = new Error();
      const putDescriptor = accountListGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('AccountListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AccountSaga();
      const cachedMethod = validateReduxCache(getAccountNavigationList);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
