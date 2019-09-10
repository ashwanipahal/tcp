import { LOAD_RECOMMENDATIONS_DATA } from './Recommendations.constants';

const initialState = {};

const RecommendationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECOMMENDATIONS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default RecommendationsReducer;
