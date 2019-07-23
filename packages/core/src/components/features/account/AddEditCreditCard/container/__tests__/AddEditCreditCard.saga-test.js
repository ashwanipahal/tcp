import { put, takeLatest } from 'redux-saga/effects';
import { List } from 'immutable';
import {
  addCreditCardSaga,
  updateCreditCardSaga,
  AddEditCreditCardSaga,
} from '../AddEditCreditCard.saga';
import { addCreditCardSuccess, addCreditCardError } from '../AddEditCreditCard.actions';
import constants from '../AddEditCreditCard.constants';

describe('AddEditCreditCard saga', () => {
  describe('addCreditCardSaga', () => {
    it('should dispatch addCreditCardSuccess action for success resposnse', () => {
      const payload = {
        address: {},
        cardType: 'VISA',
        onFileAddressKey: '11111',
      };
      const addCreditCardGen = addCreditCardSaga({ payload });
      const response = {
        creditCardId: '12345',
      };
      addCreditCardGen.next();
      addCreditCardGen.next(List([{}]));
      addCreditCardGen.next(
        List([
          {
            addressId: '11111',
            addressLine: ['addressline 1', ''],
          },
        ])
      );
      addCreditCardGen.next(response);
      addCreditCardGen.next();
      addCreditCardGen.next();
      const putDescriptor = addCreditCardGen.next().value;
      expect(putDescriptor).toEqual(put(addCreditCardSuccess({ response })));
    });

    it('should dispatch addCreditCardError action for error resposnse', () => {
      const payload = {
        address: {
          firstName: 'test',
          lastName: 'test',
        },
        cardType: 'VISA',
      };
      const addCreditCardGen = addCreditCardSaga({ payload });
      addCreditCardGen.next();
      addCreditCardGen.next(List());
      addCreditCardGen.next(
        List([
          {
            addressId: '11111',
            addressLine: ['addressline 2', ''],
          },
        ])
      );
      addCreditCardGen.next('1234567890');
      const putDescriptor = addCreditCardGen.throw(new Error('error')).value;
      expect(putDescriptor).toEqual(
        put(
          addCreditCardError({
            errorMessage: 'error',
          })
        )
      );
    });
  });

  describe('updateCreditCardSaga', () => {
    it('should dispatch addCreditCardSuccess action for success resposnse', () => {
      const payload = {
        address: {},
        cardType: 'VISA',
        onFileAddressKey: '11111',
      };
      const addCreditCardGen = updateCreditCardSaga({ payload });
      const response = {
        creditCardId: '12345',
      };
      addCreditCardGen.next();
      addCreditCardGen.next(
        List([
          {
            addressId: '11111',
            addressLine: ['addressline 3', ''],
          },
        ])
      );
      addCreditCardGen.next(response);
      addCreditCardGen.next();
      addCreditCardGen.next();
      const putDescriptor = addCreditCardGen.next().value;
      expect(putDescriptor).toEqual(put(addCreditCardSuccess({ response })));
    });

    it('should dispatch addCreditCardError action for error resposnse', () => {
      const payload = {
        address: {
          firstName: 'test',
          lastName: 'test',
        },
        cardType: 'VISA',
      };
      const addCreditCardGen = updateCreditCardSaga({ payload });
      addCreditCardGen.next();
      addCreditCardGen.next(
        List([
          {
            addressId: '11111',
            addressLine: ['addressline 1', ''],
          },
        ])
      );
      addCreditCardGen.next('1234567890');
      const putDescriptor = addCreditCardGen.throw(new Error('system error')).value;
      expect(putDescriptor).toEqual(
        put(
          addCreditCardError({
            errorMessage: 'system error',
          })
        )
      );
    });
  });

  describe('AddEditCreditCardSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddEditCreditCardSaga();
      let takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(constants.ADD_CREDIT_CARD, addCreditCardSaga)
      );

      takeLatestDescriptor = generator.next().value;

      expect(takeLatestDescriptor).toEqual(
        takeLatest(constants.EDIT_CREDIT_CARD, updateCreditCardSaga)
      );
    });
  });
});
