import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';

function* fetchRecommendationsData() {
  try {
    const result = yield call(RecommendationsAbstractor.getData, {
      page: 'homepage',
    });

    yield put(loadRecommendationsData(result));
  } catch (e) {
    console.log(e);
  }
}

function* RecommendationsSaga() {
  yield takeLatest(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
