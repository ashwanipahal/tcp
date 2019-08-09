import { put, takeLatest } from 'redux-saga/effects';
import { getPointsHistoryList, PointsHistorySaga } from '../PointsHistory.saga';
import { validateReduxCache } from '../../../../../../../../utils/cache.util';
import { getPointsHistoryList as getPointsHistoryListAction}  from '../PointsHistory.actions';
import POINTSHISTORY_CONSTANTS from '../../PointsHistory.constants';

describe('Points History List saga', () => {
  describe('getPointsHistoryList', () => {
    let pointsHistoryListGen;
    beforeEach(() => {
      pointsHistoryListGen = getPointsHistoryList();
      pointsHistoryListGen.next();
      pointsHistoryListGen.next();
    });
    // TODO - Rewrite Test cases to include Integration testing of Saga and Abstractor
    it('should dispatch getPointsHistoryListAction action for success resposnse', () => {
      const response = {
        body: {
          pointsHistoryData: [],
        },
      };
      const {
        body: { pointsHistoryData },
      } = response;
      const putDescriptor = pointsHistoryListGen.next(pointsHistoryData).value;
      expect(putDescriptor).toEqual(put(getPointsHistoryListAction(response.body.pointsHistoryData)));
    });

    it('should not dispatch getPointsHistoryListAction action for error', () => {
      const error = new Error();
      const putDescriptor = pointsHistoryListGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('PointsHistorySaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = PointsHistorySaga();
      const cachedMethod = validateReduxCache(getPointsHistoryList);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
