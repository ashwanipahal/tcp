import { put, takeLatest } from 'redux-saga/effects';
import { getPointsHistoryListSaga, PointsHistorySaga } from '../PointsHistory.saga';
import { validateReduxCache } from '../../../../../../../../utils/cache.util';
import { setPointsHistoryList } from '../PointsHistory.actions';
import POINTSHISTORY_CONSTANTS from '../../PointsHistory.constants';

describe('Point history saga', () => {
  describe('getPointsHistoryListSaga', () => {
    let pointsHistoryGen;
    beforeEach(() => {
      pointsHistoryGen = getPointsHistoryListSaga();
      pointsHistoryGen.next();
    });

    // TODO - Rewrite Test cases to include Integration testing of Saga and Abstractor
    it('should dispatch getPointsHistoryList action for success resposnse', () => {
      const response = {};
      const putDescriptor = pointsHistoryGen.next(response).value;
      expect(putDescriptor).toEqual(put(setPointsHistoryList(response)));
    });

    it('should not dispatch getPointsHistoryList action for error', () => {
      const error = new Error();
      const putDescriptor = pointsHistoryGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('Point history saga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = PointsHistorySaga();
      const cachedMethod = validateReduxCache(getPointsHistoryListSaga);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
