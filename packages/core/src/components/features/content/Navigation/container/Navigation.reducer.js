import NAVIGATION_CONSTANTS from './Navigation.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const handleMoreEvents = (state, action) => {
  switch (action.type) {
    case NAVIGATION_CONSTANTS.HIDE_ALL_DRAWERS:
      return {
        ...state,
        l3Drawer: {
          closeDrawer: true,
          openDrawer: false,
        },
        closeDrawer: true,
        openDrawer: false,
        hideNavigationFooter: false,
      };
    default:
      return state;
  }
};

const NavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_CONSTANTS.LOAD_NAVIGATION_DATA:
      return { ...state, navigationData: action.payload, [DEFAULT_REDUCER_KEY]: setCacheTTL() };
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
        hideNavigationFooter: false,
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
    case NAVIGATION_CONSTANTS.HIDE_NAVIGATION_FOOTER:
      return {
        ...state,
        hideNavigationFooter: true,
      };
    case NAVIGATION_CONSTANTS.SHOW_NAVIGATION_FOOTER:
      return {
        ...state,
        hideNavigationFooter: false,
      };
    case NAVIGATION_CONSTANTS.REMOVE_L1_FOCUS:
      return {
        ...state,
        removeL1Focus: action.payload,
      };
    default:
      return handleMoreEvents(state, action);
  }
};

export default NavigationReducer;
