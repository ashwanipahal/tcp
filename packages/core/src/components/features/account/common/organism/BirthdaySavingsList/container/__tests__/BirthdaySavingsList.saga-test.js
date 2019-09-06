import { put } from 'redux-saga/effects';
import { getChildrenSaga, removeChildSaga } from '../BirthdaySavingsList.saga';
import {
  updateBirthdaySavingSuccess,
  updateBirthdaySavingError,
} from '../BirthdaySavingsList.actions';
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

  describe('removeChildSaga', () => {
    let gen;
    beforeEach(() => {
      gen = removeChildSaga({});
      gen.next();
    });

    it('should dispatch setUserPersonalData action for success resposnse', () => {
      const response = [{}];
      gen.next(response);
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(updateBirthdaySavingSuccess(response)));
    });

    it('should dispatch updateBirthdaySavingError action for error response', () => {
      const response = [{}];
      const putDescriptor = gen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateBirthdaySavingError(response)));
    });
  });
});
