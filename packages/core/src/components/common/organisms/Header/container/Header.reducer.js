import HEADER_CONSTANTS from './Header.constants';

const initailState = {
  miniBag: false,
};

const HeaderReducer = (state = initailState, action) => {
  switch (action.type) {
    case HEADER_CONSTANTS.LOAD_HEADER_DATA:
      return { ...state, ...action.payload };
    case HEADER_CONSTANTS.OPEN_NAVIGATION_DRAWER:
      return {
        ...state,
        navigationDrawer: { open: action.payload, close: false },
      };
    case HEADER_CONSTANTS.CLOSE_NAVIGATION_DRAWER:
      return {
        ...state,
        navigationDrawer: { close: true, open: false },
      };
    case HEADER_CONSTANTS.CLOSE_MINI_BAG:
      return {
        ...state,
        miniBag: false,
      };
    case HEADER_CONSTANTS.OPEN_MINI_BAG:
      return {
        ...state,
        miniBag: true,
      };
    default:
      return state;
  }
};

export default HeaderReducer;
