import { takeLatest } from 'redux-saga/effects';
import {
  fetchModuleX,
  submitCreditCardForm,
  ApplyCreditCardSaga,
  SubmitInstantCardApplication,
} from '../ApplyCard.saga';
import constants from '../../RewardsCard.constants';

describe('Apply Instant credit card saga', () => {
  it('should dispatch addToCartEcomGen action for success resposnse', () => {
    const payload = [
      {
        name: 'header',
      },
      {
        name: 'footer',
      },
    ];
    const applyCardGen = fetchModuleX({ payload });
    applyCardGen.next();

    const response = {
      data: {
        header: {
          composites: {
            richTextList: [{ text: 'header' }],
          },
        },
        footer: {
          composites: {
            richTextList: [{ text: 'footer' }],
          },
        },
      },
    };

    const putDescriptor = applyCardGen.next(response).value;
    expect(putDescriptor).not.toBe(null);
  });

  it('should dispatch addToCartEcomGen action for success resposnse', () => {
    const applyCardGen = fetchModuleX({});
    applyCardGen.next();
    const putDescriptor = applyCardGen.next().value;
    expect(putDescriptor).toBe(null);
  });

  const payload = {
    firsName: 'a',
    lastName: 'b',
  };

  it('should execute submitCreditCardForm', () => {
    const fetchModulexGen = submitCreditCardForm({ payload });
    fetchModulexGen.next();

    const res = {
      status: '1111',
    };
    const putDescriptor = fetchModulexGen.next(res).value;
    expect(putDescriptor).not.toBe(null);
  });

  it('should execute submitCreditCardForm', () => {
    const fetchModulexGen = submitCreditCardForm({});
    fetchModulexGen.next();

    const res = {
      status: '1111',
    };
    const putDescriptor = fetchModulexGen.next(res).value;
    expect(putDescriptor).not.toBe(null);
  });

  describe('ApplyCreditCardSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ApplyCreditCardSaga();
      expect(generator.next().value.toString()).toMatch(
        takeLatest(constants.FETCH_MODULEX_CONTENT, fetchModuleX).toString()
      );
    });
  });

  describe('submitCreditCardFormSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SubmitInstantCardApplication();
      expect(generator.next().value.toString()).not.toBe(null);
    });
  });
});
