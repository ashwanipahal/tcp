import HELPCENTER_CONSTANTS from '../HelpCenter.constants';

export const getFetchNavigationData = payload => {
  return {
    payload,
    type: HELPCENTER_CONSTANTS.FETCH_SUBNAVIGATION_DATA,
  };
};

export const setNavigationData = payload => {
  return {
    payload,
    type: HELPCENTER_CONSTANTS.SET_SUBNAVIGATION_DATA,
  };
};
