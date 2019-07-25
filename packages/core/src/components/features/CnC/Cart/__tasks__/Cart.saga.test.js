import { put, takeLatest } from 'redux-saga/effects';
import { getOrderDetailSaga, CartSaga } from '../containers/Cart.saga';
import { getOrderDetailsComplete } from '../containers/Cart.actions';
import CART_CONSTANTS from '../Cart.constants';

describe('Cart saga', () => {
  describe('getOrderDetails', () => {
    let orderData;
    beforeEach(() => {
      orderData = getOrderDetailSaga();
      orderData.next();
    });
    it('should dispatch getOrderList action for success response', () => {
      const response = {
        orderDetails: {
          orderId: '123',
        },
      };
      expect(orderData.next(response).value).toEqual(
        put(getOrderDetailsComplete(response.orderDetails))
      );
    });
  });

  describe('CartSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = CartSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(CART_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
