import FOOTER_CONSTANTS from '../Footer.constants';

const FooterReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOTER_CONSTANTS.LOAD_FOOTER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default FooterReducer;
