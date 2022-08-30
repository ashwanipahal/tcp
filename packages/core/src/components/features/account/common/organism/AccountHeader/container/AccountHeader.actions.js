import constants from '../AccountHeader.constants';

export const fetchModuleX = payload => {
  return {
    payload,
    type: constants.FETCH_MODULEX_CONTENT,
  };
};

export const setModuleX = payload => {
  return {
    payload,
    type: constants.SET_MODULEX_CONTENT,
  };
};
