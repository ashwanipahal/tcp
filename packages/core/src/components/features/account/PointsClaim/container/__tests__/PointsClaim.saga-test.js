import { put, takeLatest } from 'redux-saga/effects';
import { SubmitClaimForm, PointsClaimSaga } from '../PointsClaim.saga';
import { submitClaimError, submitClaimSuccess } from '../PointsClaim.actions';
import constants from '../../PointsClaim.constants';

describe('PointsClaimSaga saga', () => {
  const payload = {
    FirstName: 'ravi',
    LastName: 'prasad',
    MyPlaceNumber: 'B10000012603281',
    EmailAddr: 'TCPTEST21@YOPMAIL.COM',
    StoreType: 'S',
    StoreNumber: '1234',
    RegisterNumber: '12',
    TransNumber: '1234',
    TransDate: '10/16/2019',
  };

  describe('PointsClaim', () => {
    let gen;
    beforeEach(() => {
      gen = SubmitClaimForm(payload);
    });

    it('should dispatch submitClaimError action for success resposnse with ErrorDescription', () => {
      const response = {
        body: {
          statusCode: '3',
          ErrorDescription: 'No Transaction Found',
        },
      };
      gen.next();
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(submitClaimError(response.body)));
    });

    it('should dispatch submitClaimSuccess action for success resposnse', () => {
      const response = {
        body: {},
      };
      gen.next();
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(submitClaimSuccess(response)));
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
