import { call, takeLatest, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import constants from '../Orders.constants';
import { setOrdersList } from './Orders.actions';
import { getOrderHistory } from '../../../../../services/abstractors/account';

/**
 * @function getMyOrders
 * @description This function will call getOrderHistory Abstractor to get order history data
 */
export function* getMyOrders({ payload }) {
  try {
    const orders = yield call(getOrderHistory, payload.siteId, payload.currentSiteId);
    yield put(setOrdersList(orders));
  } catch (e) {
    logger.error('getOrderHistory error', e);
  }
}

/**
 * @function OrdersSaga
 * @description watcher function for fetch orders.
 */
export function* OrdersSaga() {
  yield takeLatest(constants.GET_ORDERS_LIST, getMyOrders);
}

export default OrdersSaga;
