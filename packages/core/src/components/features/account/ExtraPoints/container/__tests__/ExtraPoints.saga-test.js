import { put, takeLatest } from 'redux-saga/effects';
import { ExtraPointsSaga, fetchPromoList } from '../ExtraPoints.saga';
import { setPromoList } from '../ExtraPoints.actions';
import EXTRA_POINTS_CONSTANTS from '../../ExtraPoints.constants';

describe('Promo List Saga', () => {
  let promoListGen;
  const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  beforeEach(() => {
    promoListGen = fetchPromoList({ payload });
  });
  describe('fetchmoduleX', () => {
    it('should dispatch setPromoList action for success response', () => {
      const response = promoListGen.next().value;
      expect(promoListGen.next(response).value).toEqual(put(setPromoList(response)));
    });
  });
  describe('ExtraPointsSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ExtraPointsSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(EXTRA_POINTS_CONSTANTS.FETCH_PROMO_LIST_CONTENT, fetchPromoList)
      );
    });
  });
});
