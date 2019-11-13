import GLOBAL_CONSTANTS from '../constants';

const ApiConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_API_CONFIG:
      return { ...state, ...action.payload };
    case GLOBAL_CONSTANTS.SET_PREVIEW_DATE:
      return { ...state, ...{ previewDate: action.payload } };
    case GLOBAL_CONSTANTS.SET_PAGE_REFERER:
      return { ...state, pageDataReferer: action.payload };
    default:
      return state;
  }
};

export default ApiConfigReducer;
