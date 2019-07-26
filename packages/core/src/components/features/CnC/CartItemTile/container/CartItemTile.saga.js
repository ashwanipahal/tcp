/**
 * These are temporary changes for a dummy login page
 */
// TODO: Need fix unused/proptypes eslint error

import { call, takeLatest, put } from 'redux-saga/effects';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import fetchData from '../../../../../service/API';
import {
  getOrderDetails,
  getOrderDetailsComplete,
  removeCartItemComplete,
  updateCartItemComplete,
} from './CartItemTile.actions';
import endpoints from '../../../../../service/endpoint';
import { getOrderDetailsData, removeItem, updateItem, } from '../../../../../services/abstractors/CnC';

const errorLabel = 'Error in API';

function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    yield put(getOrderDetailsComplete(res));
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

function* removeCartItem({ payload }) {
  try {
    console.log(payload);
    const res = yield call(removeItem, payload);
    yield put(removeCartItemComplete(res));
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

function* updateCartItemSaga({ payload }) {
    try {
      const res = yield call(updateItem, payload);
      yield put(updateCartItemComplete(res));
    } catch (err) {
      console.log(errorLabel);
      console.log(err);
    }
  }

function* CartPageSaga() {
  yield takeLatest(CARTPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM, removeCartItem);
  yield takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM_COMPLETE, getOrderDetailSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM_COMPLETE, getOrderDetailSaga);
}

export default CartPageSaga;
