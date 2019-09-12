import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';

function* fetchRecommendationsData() {
  const result = yield call(RecommendationsAbstractor.getData, {
    page: 'homepage',
  });

  yield put(loadRecommendationsData(result));
}

function* RecommendationsSaga() {
  yield takeLatest(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
