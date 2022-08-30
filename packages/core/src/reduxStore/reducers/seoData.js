/* eslint-disable */
import GLOBAL_CONSTANTS from '../constants';

// TODO: Remove NOSONAR from line below and disable the default parameters rule
// Remove eslint-disable after NOSONAR is removed
/* //NOSONAR */ const SEODataReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_SEO_DATA:
      return { ...state, ...action.payload };
    case GLOBAL_CONSTANTS.SET_SEO_DATA:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export default SEODataReducer;
