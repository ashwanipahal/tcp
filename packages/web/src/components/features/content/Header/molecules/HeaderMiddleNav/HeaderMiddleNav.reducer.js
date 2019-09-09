import HEADER_CONSTANTS from './HeaderMiddleNav.constants';

const initialState = {};

const HeaderMiddleNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADER_CONSTANTS.SET_SEARCH:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default HeaderMiddleNavReducer;
