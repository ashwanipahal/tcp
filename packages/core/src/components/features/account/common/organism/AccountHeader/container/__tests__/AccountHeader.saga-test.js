import { put, takeLatest } from 'redux-saga/effects';
import { fetchModuleX, AccountHeaderSaga } from '../AccountHeader.saga';
import { setModuleX } from '../AccountHeader.actions';
import constants from '../../AccountHeader.constants';

describe('AccountHeader saga', () => {
  describe('fetchModuleX', () => {
    let gen;
    beforeEach(() => {
      const payload = '';
      gen = fetchModuleX({ payload });
      gen.next();
    });
    it('should dispatch setModuleX for success response', () => {
      const response = {};
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(setModuleX(response)));
    });
  });

  describe('AccountHeaderSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AccountHeaderSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.FETCH_MODULEX_CONTENT, fetchModuleX);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
