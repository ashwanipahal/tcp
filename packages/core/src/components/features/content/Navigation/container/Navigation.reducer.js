import NAVIGATION_CONSTANTS from './Navigation.constants';

const NavigationReducer = (state = {}, action) => {
  switch (action.type) {
    case NAVIGATION_CONSTANTS.LOAD_NAVIGATION_DATA:
      return { ...state, navigationData: action.payload };
    case NAVIGATION_CONSTANTS.OPEN_L2_PANEL:
      return {
        ...state,
        panelData: action.data,
        order: action.order,
        openPanel: true,
      };
    case NAVIGATION_CONSTANTS.CLOSE_L2_PANEL:
      return {
        ...state,
        openPanel: false,
      };
    default:
      return state;
  }
};

export default NavigationReducer;
