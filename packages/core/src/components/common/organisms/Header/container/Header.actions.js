import HEADER_CONSTANTS from './Header.constants';

export const openNavigationDrawer = payload => {
  return {
    payload,
    type: HEADER_CONSTANTS.OPEN_NAVIGATION_DRAWER,
  };
};

export const closeNavigationDrawer = payload => {
  return {
    payload,
    type: HEADER_CONSTANTS.CLOSE_NAVIGATION_DRAWER,
  };
};

export const closeMiniBag = () => {
  return {
    type: HEADER_CONSTANTS.CLOSE_MINI_BAG,
  };
};

export const openMiniBag = () => {
  return {
    type: HEADER_CONSTANTS.OPEN_MINI_BAG,
  };
};

export const loadHeaderData = payload => {
  return {
    payload,
    type: HEADER_CONSTANTS.LOAD_HEADER_DATA,
  };
};

export default {
  loadHeaderData,
};
