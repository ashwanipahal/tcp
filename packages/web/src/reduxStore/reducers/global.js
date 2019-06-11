import GLOBAL_CONSTANTS from '../constants';

const INITIAL_STATE = {
  labels: {},
  layout: {},
};

const GlobalReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_LABELS_DATA:
      return { ...state, labels: action.payload };
    case GLOBAL_CONSTANTS.LOAD_LAYOUT_DATA:
      return { ...state, layout: action.payload };
    default:
      return state;
  }
};

export default GlobalReducers;
