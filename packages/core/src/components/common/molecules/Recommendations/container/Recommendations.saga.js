import { call, put, takeEvery } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';
import logger from '../../../../../utils/loggerInstance';

function* fetchRecommendationsData(action) {
  const { payload } = action;
  try {
    const result = yield call(RecommendationsAbstractor.getData, payload);

    yield put(loadRecommendationsData({ reduxKey: payload.reduxKey, result }));
  } catch (e) {
    logger.log('Error has occurred: ', e);
  }
}

function* RecommendationsSaga() {
  yield takeEvery(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
