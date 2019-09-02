import { call, put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import getCandidAbstractor from '../../../../../services/abstractors/common/getCandid';
import CONSTANTS from './GetCandid.constants';
import { setCandidData } from './GetCandid.actions';

export function* fetchCandidData({ payload }) {
  try {
    const res = yield call(getCandidAbstractor.getData, payload);
    yield put(setCandidData(res));
  } catch (error) {
    console.log(error);
  }
}

function* GetCandidSaga() {
  const cachedCandidData = validateReduxCache(fetchCandidData);
  yield takeLatest(CONSTANTS.FETCH_DATA, cachedCandidData);
}

export default GetCandidSaga;
