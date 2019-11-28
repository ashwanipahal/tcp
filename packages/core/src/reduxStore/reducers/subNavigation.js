import GLOBAL_CONSTANTS from '../constants';

const SubNavigationReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_SUB_NAVIGATION_DATA:
      return {
        ...state,
        [action.name]: action.payload,
      };
    default:
      return state;
  }
};

export default SubNavigationReducer;
