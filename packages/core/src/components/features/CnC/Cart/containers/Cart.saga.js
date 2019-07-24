import { call, takeLatest, put } from 'redux-saga/effects';
import { getOrderDetailsData } from '../../../../../services/abstractors/CnC/CartItemTile';
import CART_CONSTANTS from '../Cart.constants';
import { getOrderDetailsComplete } from './Cart.actions';

function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    yield put(getOrderDetailsComplete(res && res.orderDetails));
  } catch (err) {
    console.log(err);
  }
}

export function* CartSaga() {
  yield takeLatest(CART_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
}

export default CartSaga;
