import { put, takeLatest } from 'redux-saga/effects';
import { fetchModuleX, CreditCardSaga } from '../container/CreditCard.saga';
import { setModuleX } from '../container/CreditCard.action';
import CREDIT_CARD_CONSTANTS from '../container/CreditCard.constants';

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
  describe('AddEditCreditCardSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = CreditCardSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(CREDIT_CARD_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX)
      );
    });
  });
});
