import { put } from 'redux-saga/effects';
import { navigateXHRSaga } from '../NavigateXHR.saga';
import { NavigateXHR } from '../../../../../../services/abstractors/account';

describe('navigateXHR saga', () => {
  describe('navigateXHRSaga', () => {
    let navigateXHRGen;

    beforeEach(() => {
      navigateXHRGen = navigateXHRSaga();
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
