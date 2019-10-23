import { call, takeLatest, put, select } from 'redux-saga/effects';
import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';
import { setOrderDetails } from './OrderDetails.actions';
import { getOrderInfoByOrderId } from '../../../../../services/abstractors/account/ordersList';
import { getUserEmail, getIsGuest } from '../../User/container/User.selectors';

export function* getOrderDetailsListSaga({ payload }) {
  const userEmail = yield select(getUserEmail);
  const isGuest = yield select(getIsGuest);

  const updatedPayload = { ...payload, ...{ email: userEmail, isGuest } };
  try {
    const OrderDetailsList = yield call(getOrderInfoByOrderId, updatedPayload);
    yield put(setOrderDetails(OrderDetailsList));
  } catch (err) {
    yield null;
  }
}

export function* OrderDetailsListSaga() {
  yield takeLatest(ORDERDETAILS_CONSTANTS.GET_ORDERDETAILS, getOrderDetailsListSaga);
}

export default OrderDetailsListSaga;
