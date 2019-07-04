import GLOBAL_CONSTANTS from '../constants';

const LabelReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_LABELS_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default LabelReducer;
