import GLOBAL_CONSTANTS from '../constants';

const LayoutReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_LAYOUT_DATA:
      return {
        ...state,
        [action.layoutName]: { ...action.payload },
      };
    default:
      return state;
  }
};

export default LayoutReducer;
