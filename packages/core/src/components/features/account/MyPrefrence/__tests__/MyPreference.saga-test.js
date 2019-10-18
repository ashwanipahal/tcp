import { put, takeLatest } from 'redux-saga/effects';
import { getOrderDetailsListSaga, OrderDetailsListSaga } from '../OrderDetails.saga';
import { setOrderDetails } from '../OrderDetails.actions';
import constants from '../../OrderDetails.constants';

describe('getOrderDetailsListSaga saga', () => {
  describe('getOrderDetailsListSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getOrderDetailsListSaga({});
      gen.next();
      gen.next();
      gen.next();
    });

    it('should dispatch setOrderDetails action for response', () => {
      const OrderDetailsList = {
        getOrderInfoByOrderId: '',
        updatedPayload: {},
      };
      const putDescriptor = gen.next(OrderDetailsList).value;
      expect(putDescriptor).toEqual(put(setOrderDetails(OrderDetailsList)));
    });
  });

  describe('OrderDetailsListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = OrderDetailsListSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.GET_ORDERDETAILS, getOrderDetailsListSaga);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
