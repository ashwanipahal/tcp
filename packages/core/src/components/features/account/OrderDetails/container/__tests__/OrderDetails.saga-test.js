import { put, takeLatest } from 'redux-saga/effects';
import { getOrderDetailsListSaga, OrderDetailsListSaga } from '../OrderDetails.saga';
import { setOrderDetailInfo } from '../../../TrackOrder/container/TrackOrder.actions';
import { setOrderDetails } from '../OrderDetails.actions';
import constants from '../../OrderDetails.constants';

describe('getOrderDetailsListSaga saga', () => {
  describe('getOrderDetailsListSaga', () => {
    let gen;
    it('should dispatch setOrderDetails action for response', () => {
      gen = getOrderDetailsListSaga({ payload: { emailAddress: null } });
      gen.next();
      gen.next();
      gen.next();

      const OrderDetailsList = {
        getOrderInfoByOrderId: '',
        updatedPayload: {},
        orderDetailsReturn: {},
      };
      const putDescriptor = gen.next(OrderDetailsList).value;
      expect(putDescriptor).toEqual(put(setOrderDetails(OrderDetailsList.orderDetailsReturn)));
    });

    it('should dispatch setOrderDetailInfo action for response if action is track order', () => {
      gen = getOrderDetailsListSaga({ payload: { emailAddress: 'test@test.com' } });
      gen.next();
      gen.next();
      gen.next();

      const OrderDetailsList = {
        getOrderInfoByOrderId: '',
        updatedPayload: {},
        trackOrderInfo: {},
      };
      const putDescriptor = gen.next(OrderDetailsList).value;
      expect(putDescriptor).toEqual(put(setOrderDetailInfo(OrderDetailsList.trackOrderInfo)));
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
