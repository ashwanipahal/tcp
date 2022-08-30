import { put, takeLatest } from 'redux-saga/effects';
import {
  getEarnedPointsNotificationSaga,
  EarnedPointsNotificationSaga,
} from '../EarnedPointsNotification.saga';
import { setEarnedPointsNotification } from '../EarnExtraPointsTile.actions';
import EARNEXTRAPOINTS_CONSTANTS from '../../EarnExtraPointsTile.constants';

describe('Earned Points Notification Saga', () => {
  describe('getEarnedPointsNotificationSaga', () => {
    let earnExtraPointsGen;
    beforeEach(() => {
      earnExtraPointsGen = getEarnedPointsNotificationSaga();
      earnExtraPointsGen.next();
    });

    it('should dispatch setEarnedPointsNotification action for success resposnse', () => {
      const response = {};
      const putDescriptor = earnExtraPointsGen.next(response).value;
      expect(putDescriptor).toEqual(put(setEarnedPointsNotification(response)));
    });

    it('should not dispatch getEarnedPointsNotification action for error', () => {
      const error = new Error();
      const putDescriptor = earnExtraPointsGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('Earn Extra Points Saga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = EarnedPointsNotificationSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(
        EARNEXTRAPOINTS_CONSTANTS.GET_EARNEDPOINTS_NOTIFICATION,
        getEarnedPointsNotificationSaga
      );
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
