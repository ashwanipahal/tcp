import { put, takeLatest } from 'redux-saga/effects';
import { getEarnExtraPointsListSaga, EarnExtraPointsSaga } from '../EarnExtraPointsTile.saga';
import { validateReduxCache } from '../../../../../../../../utils/cache.util';
import { setEarnExtraPointsList } from '../EarnExtraPointsTile.actions';
import EARNEXTRAPOINTS_CONSTANTS from '../../EarnExtraPointsTile.constants';

describe('Earn Extra Points Saga', () => {
  describe('getEarnExtraPointsListSaga', () => {
    let earnExtraPointsGen;
    beforeEach(() => {
      earnExtraPointsGen = getEarnExtraPointsListSaga();
      earnExtraPointsGen.next();
    });

    it('should dispatch setEarnExtraPointsList action for success resposnse', () => {
      const response = {};
      earnExtraPointsGen.next();
      const putDescriptor = earnExtraPointsGen.next(response).value;
      expect(putDescriptor).toEqual(put(setEarnExtraPointsList(response)));
    });

    it('should not dispatch getEarnExtraPointsList action for error', () => {
      const error = new Error();
      const putDescriptor = earnExtraPointsGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('Earn Extra Points Saga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = EarnExtraPointsSaga();
      const cachedMethod = validateReduxCache(getEarnExtraPointsListSaga);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
