import { call, takeLatest, put } from 'redux-saga/effects';
import BONUS_POINTS_DAYS_CONSTANTS from '../BonusPointsDays.constants';
import { validateReduxCache } from '../../../../../utils/cache.util';
import {
  getBonusPointsData,
  applyBonusPointsData,
} from '../../../../../services/abstractors/account';
import {
  setBonusDaysSuccess,
  setBonusDaysError,
  showLoader,
  setModuleX,
} from './BonusPointsDays.actions';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';

export function* getBonusDaysData() {
  try {
    yield put(showLoader());
    const res = yield call(getBonusPointsData);
    yield put(setBonusDaysSuccess(res));
  } catch (err) {
    yield put(setBonusDaysError(err));
  }
}

export function* applyBonusDaysData(dto) {
  try {
    yield call(applyBonusPointsData, dto);
    yield call(getBonusDaysData);
  } catch (err) {
    yield put(setBonusDaysError(err));
  }
}

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* BonusPointsSaga() {
  const cachedBonusDaysData = validateReduxCache(getBonusDaysData);
  yield takeLatest(BONUS_POINTS_DAYS_CONSTANTS.GET_BONUS_DAYS, cachedBonusDaysData);
  yield takeLatest(BONUS_POINTS_DAYS_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
  yield takeLatest(BONUS_POINTS_DAYS_CONSTANTS.APPLY_BONUS_DAYS, applyBonusDaysData);
}

export default BonusPointsSaga;
