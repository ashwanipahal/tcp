import { call, put, takeEvery } from 'redux-saga/effects';
import RecommendationsAbstractor from '../../../../../services/abstractors/common/recommendations';
import { loadRecommendationsData } from './Recommendations.actions';
import { FETCH_RECOMMENDATIONS_DATA } from './Recommendations.constants';
import logger from '../../../../../utils/loggerInstance';
import { toastMessageInfo } from '../../../atoms/Toast/container/Toast.actions.native';
import { isMobileApp } from '../../../../../utils';
import errorMessage from '../../../../../services/handler/stateful/errorResponseMapping/index.json';

function* fetchRecommendationsData(action) {
  const { payload } = action;
  try {
    const result = yield call(RecommendationsAbstractor.getAppData, payload);
    yield put(
      loadRecommendationsData({
        reduxKey: payload.reduxKey,
        result,
      })
    );
  } catch (e) {
    logger.log(e);
    if (isMobileApp())
      yield put(toastMessageInfo(errorMessage.ERROR_MESSAGES_BOPIS.storeSearchException));
  }
}

function* RecommendationsSaga() {
  yield takeEvery(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
}

export default RecommendationsSaga;
