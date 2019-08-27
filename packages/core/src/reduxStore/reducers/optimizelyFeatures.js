import GLOBAL_CONSTANTS from '../constants';

const OptimizelyFeaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_OPTIMIZELY_FEATURES_LIST: {
      return { ...state, ...{ featuresList: action.payload } };
    }
    default:
      return state;
  }
};

export default OptimizelyFeaturesReducer;
