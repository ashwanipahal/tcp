import { put, takeLatest } from 'redux-saga/effects';
import { LoginPageSaga, loginSaga } from '../LoginPage.saga';
import { setLoginInfo } from '../LoginPage.actions';
import { getUserInfo } from '../../../User/container/User.actions';
import constants from '../../LoginPage.constants';

describe('LoginPage saga', () => {
  describe('loginSaga', () => {
    let loginGen;
    beforeEach(() => {
      const payload = {};
      loginGen = loginSaga({ payload });
      loginGen.next();
    });

    it('should dispatch getUserInfo action for success resposnse', () => {
      const putDescriptor = loginGen.next({
        success: true,
      }).value;
      expect(putDescriptor).toEqual(put(getUserInfo()));
    });

    it('should dispatch setLoginInfo action for API error', () => {
      const putDescriptor = loginGen.next({
        success: false,
      }).value;
      expect(putDescriptor).toEqual(
        put(
          setLoginInfo({
            success: false,
          })
        )
      );
    });

    it('should dispatch setLoginInfo for error response', () => {
      const error = new Error();
      const putDescriptor = loginGen.throw(error).value;
      expect(putDescriptor).toEqual(
        put(
          setLoginInfo({
            success: false,
          })
        )
      );
    });
  });

  describe('LoginPageSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = LoginPageSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.LOGIN, loginSaga);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
