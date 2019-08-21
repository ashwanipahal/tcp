import { put, takeLatest } from 'redux-saga/effects';
import { logoutSaga, LogOutPageSaga } from '../LogOut.saga';
import { resetUserInfo } from '../../../User/container/User.actions';
import LOGOUT_CONSTANTS from '../../LogOut.constants';

describe('LoginPage saga', () => {
  describe('loginSaga', () => {
    let logoutGen;
    beforeEach(() => {
      const payload = {};
      logoutGen = logoutSaga({ payload });
      logoutGen.next();
    });
    it('should dispatch updateAddressListOnDelete action for success response', () => {
      const response = {
        statusCode: 200,
      };
      global.window = Object.create(window);
      const putDescriptor = logoutGen.next(response).value;
      expect(putDescriptor).toEqual(put(resetUserInfo(response)));
    });
  });

  describe('LogOutPageSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = LogOutPageSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(LOGOUT_CONSTANTS.LOGOUT_APP, logoutSaga);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
