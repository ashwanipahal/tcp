import HEADER_CONSTANTS from '../Header.constants';

const HeaderReducer = (state = {}, action) => {
  switch (action.type) {
    case HEADER_CONSTANTS.LOAD_HEADER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default HeaderReducer;
