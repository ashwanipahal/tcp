import { put } from 'redux-saga/effects';
import { getChildrenSaga } from '../BirthdaySavingsList.saga';
import { setUserPersonalData } from '../../../../../User/container/User.actions';

describe('BirthdaySavingsList saga', () => {
  describe('getChildrenSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getChildrenSaga();
      gen.next();
    });

    it('should dispatch setUserPersonalData action for success resposnse', () => {
      const response = [{}];
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(
        put(
          setUserPersonalData({
            children: response,
          })
        )
      );
    });
  });
});
