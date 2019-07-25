import NAVIGATION_CONSTANTS from './Navigation.constants';

export const loadNavigationData = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.LOAD_NAVIGATION_DATA,
  };
};

export const openL2Panel = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.OPEN_L2_PANEL,
  };
};

export const closeL2Panel = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.CLOSE_L2_PANEL,
  };
};
