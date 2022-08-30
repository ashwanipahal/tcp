import { takeEvery } from 'redux-saga/effects';
import {
  RecommendationsSaga,
  fetchRecommendationsData,
} from '../container/Recommendations.saga.native';
import { FETCH_RECOMMENDATIONS_DATA } from '../container/Recommendations.constants';

describe('Recommendation saga', () => {
  it('should return correct takeEvery effect', () => {
    const generator = RecommendationsSaga();
    const takeLatestDescriptor = generator.next().value;
    const expected = takeEvery(FETCH_RECOMMENDATIONS_DATA, fetchRecommendationsData);
    expect(takeLatestDescriptor).toEqual(expected);
  });
});
