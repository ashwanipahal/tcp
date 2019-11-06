import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';
import logger from '../../../../../utils/loggerInstance';
import { toastMessageInfo } from '../../../atoms/Toast/container/Toast.actions.native';
import { isMobileApp } from '../../../../../utils';
import errorMessage from '../../../../../services/handler/stateful/errorResponseMapping/index.json';

function* fetchRecommendationsData() {
  try {
    const result = yield call(RecommendationsAbstractor.getAppData, {
      pageType: 'pdp',
    });
    yield put(loadRecommendationsData(result));
  } catch (e) {
    if (isMobileApp())
      yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
    logger.log(e);
  }
}

function* RecommendationsSaga() {
  yield takeLatest(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
