import LOADER_CONSTANTS from '../Loader.constants';

const INITIAL_STATE = {
  loaderState: false,
};

const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_CONSTANTS.SET_LOADER_STATE:
      return { ...state, loaderState: action.payload };
    case LOADER_CONSTANTS.CLOSE_PAGE_SPINNER:
      return {
        ...state,
        loaderState: false,
      };
    case LOADER_CONSTANTS.OPEN_PAGE_SPINNER:
      return {
        ...state,
        loaderState: true,
      };
    default:
      return state;
  }
};

export default LoaderReducer;
