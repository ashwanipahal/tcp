import { put, takeLatest } from 'redux-saga/effects';
import { loginSaga, getUserInfoSaga } from '../LoginPage.saga';
import { setLoginInfo, getUserInfo } from '../LoginPage.actions';
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
      const putDescriptor = loginGen.next({}).value;
      expect(putDescriptor).toEqual(put(getUserInfo()));
    });

    it('should dispatch setLoginError form error response', () => {
      const error = new Error();
      const putDescriptor = loginGen.throw(error).value;
      expect(putDescriptor).toEqual(put(setLoginInfo()));
    });
  });

  describe('getUserInfoSaga', () => {
    let getUserInfoGen;
    beforeEach(() => {
      getUserInfoGen = getUserInfoSaga();
      getUserInfoGen.next();
    });

    it('should dispatch setLoginInfo action for success resposnse', () => {
      const response = {
        addressBook: [{}],
      };
      getUserInfoGen.next(response);
      const putDescriptor = getUserInfoGen.next().value;
      expect(putDescriptor).toEqual(put(setLoginInfo(response)));
    });

    it('should dispatch setLoginError for error response', () => {
      const error = new Error();
      const putDescriptor = getUserInfoGen.throw(error).value;
      expect(putDescriptor).toEqual(put(setLoginInfo()));
    });
  });

  describe('LoginPageSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = getUserInfoSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.LOGIN, loginSaga);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
