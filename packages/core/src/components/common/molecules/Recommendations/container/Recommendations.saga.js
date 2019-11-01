import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';
import logger from '../../../../../utils/loggerInstance';

function* fetchRecommendationsData(action) {
  const { payload } = action;
  try {
    const result = yield call(RecommendationsAbstractor.getData, payload);

    yield put(loadRecommendationsData(result));
  } catch (e) {
    logger.log(e);
  }
}

function* RecommendationsSaga() {
  yield takeLatest(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
