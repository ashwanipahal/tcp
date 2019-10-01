import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';
import { setOrderDetailsList } from './OrderDetails.actions';
import { getOrderInfoByOrderId } from '../../../../../services/abstractors/account/ordersList';
import { getUserEmail, getIsGuest } from '../../User/container/User.selectors';

export function* getOrderDetailsListSaga({ payload }) {
  const userEmail = yield select(getUserEmail);
  const isGuest = yield select(getIsGuest);

  const updatedPayload = { ...payload, ...{ email: userEmail }, ...{ isGuest } };
  try {
    const OrderDetailsList = yield call(getOrderInfoByOrderId, updatedPayload);
    yield put(setOrderDetailsList(OrderDetailsList));
  } catch (err) {
    yield null;
  }
}

export function* OrderDetailsListSaga() {
  const cachedOrderDetailsList = validateReduxCache(getOrderDetailsListSaga);
  yield takeLatest(ORDERDETAILS_CONSTANTS.GET_ORDERDETAILS_LIST, cachedOrderDetailsList);
}

export default OrderDetailsListSaga;
