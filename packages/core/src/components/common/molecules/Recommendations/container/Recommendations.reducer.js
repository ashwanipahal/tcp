import { fromJS } from 'immutable';
import { LOAD_RECOMMENDATIONS_DATA } from './Recommendations.constants';

const initialState = fromJS({});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const RecommendationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECOMMENDATIONS_DATA:
      return state.merge(action.payload);
    default:
      return getDefaultState(state);
  }
};

export default RecommendationsReducer;
