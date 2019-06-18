import MODULE_D_CONSTANTS from '../ModuleD.constants';

export const loadModuleDData = payload => {
  return {
    payload,
    type: MODULE_D_CONSTANTS.LOAD_MODULE_D_DATA,
  };
};

export const initActions = [loadModuleDData()];
