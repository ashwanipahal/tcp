import NAVIGATION_CONSTANTS from './Navigation.constants';

const NavigationReducer = (state = {}, action) => {
  switch (action.type) {
    case NAVIGATION_CONSTANTS.LOAD_NAVIGATION_DATA:
      return { ...state, navigationData: action.payload };
    case NAVIGATION_CONSTANTS.OPEN_L2_PANEL:
      return {
        ...state,
        ...action,
        openPanel: true,
      };
    case NAVIGATION_CONSTANTS.OPEN_L2_DRAWER:
      return {
        ...state,
        openDrawer: action.payload,
        closeDrawer: false,
      };
    case NAVIGATION_CONSTANTS.HIDE_L2_DRAWER:
      return {
        ...state,
        closeDrawer: true,
        openDrawer: false,
      };
    case NAVIGATION_CONSTANTS.OPEN_L3_DRAWER:
      return {
        ...state,
        l3Drawer: {
          openDrawer: action.payload,
          closeDrawer: false,
        },
      };
    case NAVIGATION_CONSTANTS.HIDE_L3_DRAWER:
      return {
        ...state,
        l3Drawer: {
          closeDrawer: true,
          openDrawer: false,
        },
      };
    default:
      return state;
  }
};

export default NavigationReducer;
