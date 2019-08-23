import NAVIGATION_CONSTANTS from './Navigation.constants';

export const loadNavigationData = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.LOAD_NAVIGATION_DATA,
  };
};

export const openL2Panel = (panelData, mainCategory, order) => {
  return {
    panelData,
    mainCategory,
    order,
    type: NAVIGATION_CONSTANTS.OPEN_L2_PANEL,
  };
};

export const openL2Drawer = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.OPEN_L2_DRAWER,
  };
};

export const hideL2Drawer = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.HIDE_L2_DRAWER,
  };
};

export const openL3Drawer = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.OPEN_L3_DRAWER,
  };
};

export const hideL3Drawer = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.HIDE_L3_DRAWER,
  };
};

export const hideNavigationFooter = () => {
  return {
    type: NAVIGATION_CONSTANTS.HIDE_NAVIGATION_FOOTER,
  };
};

export const showNavigationFooter = () => {
  return {
    type: NAVIGATION_CONSTANTS.SHOW_NAVIGATION_FOOTER,
  };
};

export const removeL1Focus = payload => {
  return {
    payload,
    type: NAVIGATION_CONSTANTS.REMOVE_L1_FOCUS,
  };
};
