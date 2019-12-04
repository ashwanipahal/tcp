import { call, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
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
import { getIsFetching } from './BonusPointsDays.selectors';
import { isCanada } from '../../../../../utils';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import BAG_PAGE_ACTIONS from '../../../../features/CnC/BagPage/container/BagPage.actions';

export function* getBonusDaysData() {
  try {
    const isAlreadyFetching = yield select(getIsFetching);
    yield put(showLoader());
    if (!isCanada() && !isAlreadyFetching) {
      const res = yield call(getBonusPointsData);
      yield put(setBonusDaysSuccess(res));
    }
  } catch (err) {
    yield put(setBonusDaysError(err));
  }
}

export function* applyBonusDaysData(dto) {
  try {
    yield put(setLoaderState(true));
    yield call(applyBonusPointsData, dto);
    yield call(getBonusDaysData);
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
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
  yield takeEvery(BONUS_POINTS_DAYS_CONSTANTS.GET_BONUS_DAYS, cachedBonusDaysData);
  yield takeLatest(BONUS_POINTS_DAYS_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
  yield takeLatest(BONUS_POINTS_DAYS_CONSTANTS.APPLY_BONUS_DAYS, applyBonusDaysData);
}

export default BonusPointsSaga;
