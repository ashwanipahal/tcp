import { FETCH_RECOMMENDATIONS_DATA, LOAD_RECOMMENDATIONS_DATA } from './Recommendations.constants';

export const fetchRecommendationsData = () => {
  return {
    type: FETCH_RECOMMENDATIONS_DATA,
  };
};

export const loadRecommendationsData = payload => {
  return {
    type: LOAD_RECOMMENDATIONS_DATA,
    payload,
  };
};

export default {
  fetchRecommendationsData,
  loadRecommendationsData,
};
