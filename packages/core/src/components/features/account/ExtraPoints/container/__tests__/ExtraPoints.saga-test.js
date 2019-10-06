import { put, takeLatest } from 'redux-saga/effects';
import { ExtraPointsSaga, fetchModuleX } from '../ExtraPoints.saga';
import { setModuleX } from '../ExtraPoints.actions';
import EXTRA_POINTS_CONSTANTS from '../../ExtraPoints.constants';

describe('Promo List Saga', () => {
  let promoListGen;
  const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  beforeEach(() => {
    promoListGen = fetchModuleX({ payload });
  });
  describe('fetchmoduleX', () => {
    it('should dispatch setmoduleX action for success response', () => {
      const response = promoListGen.next().value;
      expect(promoListGen.next(response).value).toEqual(put(setModuleX(response)));
    });
  });
  describe('ExtraPointsSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ExtraPointsSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(EXTRA_POINTS_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX)
      );
    });
  });
});
