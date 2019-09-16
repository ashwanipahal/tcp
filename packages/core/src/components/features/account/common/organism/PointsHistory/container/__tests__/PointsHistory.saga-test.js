import { put, takeLatest } from 'redux-saga/effects';
import { getPointsHistoryListSaga, PointsHistorySaga, fetchModuleX } from '../PointsHistory.saga';
import { validateReduxCache } from '../../../../../../../../utils/cache.util';
import { setPointsHistoryList, setModuleX } from '../PointsHistory.actions';
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

  describe('Module X Saga', () => {
    let moduleXGen;
    const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
    beforeEach(() => {
      moduleXGen = fetchModuleX({ payload });
    });
    describe('fetchmoduleX', () => {
      it('should dispatch setmoduleX action for success response', () => {
        const response = moduleXGen.next().value;
        expect(moduleXGen.next(response).value).toEqual(put(setModuleX(response)));
      });
    });
  });
});
