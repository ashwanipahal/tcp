import { put } from 'redux-saga/effects';
import { getChildrenSaga, removeChildSaga, addChildrenSaga } from '../BirthdaySavingsList.saga';
import {
  updateBirthdaySavingSuccess,
  updateBirthdaySavingError,
} from '../BirthdaySavingsList.actions';
import { setUserChildren } from '../../../../../User/container/User.actions';

describe('BirthdaySavingsList saga', () => {
  describe('getChildrenSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getChildrenSaga();
      gen.next();
    });

    it('should dispatch setUserChildren action for success resposnse', () => {
      const response = [{}];
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(
        put(
          setUserChildren({
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

    it('should dispatch updateBirthdaySavingSuccess action for success resposnse', () => {
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

  describe('addChildrenSaga', () => {
    let gen;
    beforeEach(() => {
      gen = addChildrenSaga({});
      gen.next();
    });

    const response = [
      {
        childBirthdayInfo: [
          {
            childBirthdayMonth: '2',
            childBirthdayYear: '2018',
            childGender: '01',
            childId: '48505',
            childName: 'a',
            timeStamp: '2019-09-13 08:11:24.652',
          },
        ],
        firstName: 'a',
        lastName: 's',
      },
    ];

    it('should dispatch updateBirthdaySavingSuccess action for success resposnse', () => {
      gen.next(response);
      gen.next(response);
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(updateBirthdaySavingSuccess(response)));
    });

    it('should dispatch updateBirthdaySavingError action for error response', () => {
      const putDescriptor = gen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateBirthdaySavingError(response)));
    });
  });
});
