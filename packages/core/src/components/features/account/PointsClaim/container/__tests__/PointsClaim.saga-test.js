import { takeLatest } from 'redux-saga/effects';
import { SubmitClaimForm, PointsClaimSaga } from '../PointsClaim.saga';
import constants from '../../PointsClaim.constants';

describe('PointsClaimSaga saga', () => {
  describe('PointsClaim', () => {
    let gen;
    beforeEach(() => {
      gen = SubmitClaimForm({});
      gen.next();
    });
  });

  describe('PointsClaimSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = PointsClaimSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.POINTS_CLAIM, SubmitClaimForm);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
