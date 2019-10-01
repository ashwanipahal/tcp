import { put } from 'redux-saga/effects';
import { NavigateXHRSaga } from '../NavigateXHR.saga';
import { NavigateXHR } from '../../../../../../services/abstractors/account';

describe('navigateXHR saga', () => {
  describe('NavigateXHRSaga', () => {
    let navigateXHRGen;

    beforeEach(() => {
      navigateXHRGen = NavigateXHRSaga();
    });

    it('should dispatch NavigateXHR action for success response', () => {
      const response = {
        success: true,
      };
      const putDescriptor = navigateXHRGen.next(response).value;
      expect(putDescriptor).toEqual(put(NavigateXHR(response)));
    });
  });
});
