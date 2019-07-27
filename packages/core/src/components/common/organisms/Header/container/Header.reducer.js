import HEADER_CONSTANTS from './Header.constants';

const HeaderReducer = (state = {}, action) => {
  switch (action.type) {
    case HEADER_CONSTANTS.LOAD_HEADER_DATA:
      return { ...state, ...action.payload };
    case HEADER_CONSTANTS.OPEN_NAVIGATION_DRAWER:
      return {
        ...state,
        navigationDrawer: { open: true },
      };
    case HEADER_CONSTANTS.CLOSE_NAVIGATION_DRAWER:
      return {
        ...state,
        navigationDrawer: { open: false },
      };
    default:
      return state;
  }
};

export default HeaderReducer;
