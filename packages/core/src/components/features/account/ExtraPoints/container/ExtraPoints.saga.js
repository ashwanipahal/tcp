import { call, takeLatest, put } from 'redux-saga/effects';
import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';
import { setPromoList } from './ExtraPoints.actions';
import { getPromoList } from '../../../../../services/abstractors/common/PromoList';

export function* fetchPromoList({ payload }) {
  try {
    const result = yield call(getPromoList, payload);
    yield put(setPromoList(result));
  } catch (err) {
    yield null;
  }
}

export function* ExtraPointsSaga() {
  yield takeLatest(EXTRA_POINTS_CONSTANTS.FETCH_PROMO_LIST_CONTENT, fetchPromoList);
}

export default ExtraPointsSaga;
