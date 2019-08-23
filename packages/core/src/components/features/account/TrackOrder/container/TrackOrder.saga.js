import { call, takeLatest, put } from 'redux-saga/effects';
import TRACK_ORDER_CONSTANTS from '../TrackOrder.constants';
import trackOrderApi from '../../../../../services/abstractors/common/trackOrder';
import { setOrderDetailInfo, setError } from './TrackOrder.actions';

export function* trackOrder({ payload }) {
  try {
    const response = yield call(trackOrderApi, payload);
    if (response) {
      yield put(setOrderDetailInfo(response));
    }
  } catch (err) {
    yield put(setError(err));
  }
}

export function* TrackOrderSaga() {
  yield takeLatest(TRACK_ORDER_CONSTANTS.TRACK_ORDER, trackOrder);
}

export default TrackOrderSaga;
