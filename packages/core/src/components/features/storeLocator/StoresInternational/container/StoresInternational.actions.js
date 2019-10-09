import STORES_INTL_CONSTANTS from './StoresInternational.constants';

export const getModuleXContent = payload => {
  return {
    payload,
    type: STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_GET_MODULEX,
  };
};

export const setModuleXContent = payload => {
  return {
    payload,
    type: STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_SET_MODULEX,
  };
};
