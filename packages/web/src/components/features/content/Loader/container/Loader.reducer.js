import LOADER_CONSTANTS from '../Loader.constants';

const INITIAL_STATE = {
  loaderState: false,
  miniBagLoaderState: false,
  addedToBagLoaderState: false,
};

const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_CONSTANTS.SET_LOADER_STATE:
      return { ...state, loaderState: action.payload };
    case LOADER_CONSTANTS.SET_SECTION_LOADER_STATE: {
      if (action.section === 'minibag') {
        return { ...state, miniBagLoaderState: action.payload };
      }
      if (action.section === 'addedtobag') {
        return { ...state, addedToBagLoaderState: action.payload };
      }
      return state;
    }
    default:
      return state;
  }
};

export default LoaderReducer;
