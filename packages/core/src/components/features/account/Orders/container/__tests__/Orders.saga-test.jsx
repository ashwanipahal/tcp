import { takeLatest } from 'redux-saga/effects';
import { OrdersSaga } from '../Orders.saga';
import ORDERS_CONSTANTS from '../../Orders.constants';

describe('Orders saga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = OrdersSaga();
    const takeLatestDescriptor = generator.next().value;
    const expected = takeLatest(ORDERS_CONSTANTS.GET_ORDERS_LIST, OrdersSaga);
    expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
  });
});
