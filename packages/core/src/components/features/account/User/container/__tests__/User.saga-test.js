import { put } from 'redux-saga/effects';
import { getUserInfoSaga } from '../User.saga';
import { setUserInfo } from '../User.actions';

describe('User saga', () => {
  describe('getUserInfoSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getUserInfoSaga();
      gen.next();
    });

    it('should dispatch setUserInfo action for success resposnse', () => {
      const response = {
        firstName: 'test',
      };
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(setUserInfo(response)));
    });
  });
});
