import { call, takeLatest, put, select } from 'redux-saga/effects';
import { navigateXHRAction } from '@tcp/core/src/components/features/account/NavigateXHR/container/NavigateXHR.action';
import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';
import { setOrderDetails } from './OrderDetails.actions';
import { setOrderDetailInfo, setError } from '../../TrackOrder/container/TrackOrder.actions';

import { getOrderInfoByOrderId } from '../../../../../services/abstractors/account/ordersList';
import { getUserEmail, getIsGuest } from '../../User/container/User.selectors';

export function* getOrderDetailsListSaga({ payload }) {
  const userEmail = yield select(getUserEmail);
  let isGuest = yield select(getIsGuest);

  let updatedPayload = { ...payload, ...{ emailAddress: userEmail, isGuest } };
  if (payload.emailAddress) {
    isGuest = true;
    updatedPayload = { ...payload, isGuest };
  }

  try {
    const OrderDetailsList = yield call(getOrderInfoByOrderId, updatedPayload);
    if (payload.emailAddress) {
      yield put(setOrderDetailInfo(OrderDetailsList.trackOrderInfo));
    }
    yield put(setOrderDetails(OrderDetailsList.orderDetailsReturn));
    yield put(navigateXHRAction());
  } catch (err) {
    yield put(setError(err));
  }
}

export function* OrderDetailsListSaga() {
  yield takeLatest(ORDERDETAILS_CONSTANTS.GET_ORDERDETAILS, getOrderDetailsListSaga);
}

export default OrderDetailsListSaga;
