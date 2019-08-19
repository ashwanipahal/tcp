import LOADER_CONSTANTS from '../Loader.constants';

const INITIAL_STATE = {
  loaderState: false,
};

const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_CONSTANTS.SET_LOADER_STATE:
      return { ...state, loaderState: action.payload };
    default:
      return state;
  }
};

export default LoaderReducer;
