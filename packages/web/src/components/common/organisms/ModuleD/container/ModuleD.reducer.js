import MODULE_D_CONSTANTS from '../ModuleD.constants';

const ModuleDReducer = (state = {}, action) => {
  switch (action.type) {
    case MODULE_D_CONSTANTS.LOAD_MODULE_D_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ModuleDReducer;
