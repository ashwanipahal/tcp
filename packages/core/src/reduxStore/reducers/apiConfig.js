import GLOBAL_CONSTANTS from '../constants';

const ApiConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_API_CONFIG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ApiConfigReducer;
