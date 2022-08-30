import { put, takeLatest } from 'redux-saga/effects';
import { logoutSaga, LogOutPageSaga } from '../LogOut.saga';
import { navigateXHRAction } from '../../../NavigateXHR/container/NavigateXHR.action';
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
      logoutGen.next(response);
      const putDescriptor = logoutGen.next().value;
      expect(putDescriptor).toEqual(
        put(
          navigateXHRAction({
            headers: {
              actionTaken: 'logout',
            },
          })
        )
      );
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
