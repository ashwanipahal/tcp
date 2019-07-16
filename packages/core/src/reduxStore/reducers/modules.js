import GLOBAL_CONSTANTS from '../constants';

const ModulesReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_MODULES_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ModulesReducer;
