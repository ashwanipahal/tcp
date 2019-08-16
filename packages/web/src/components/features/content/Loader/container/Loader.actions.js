import LOADER_CONSTANTS from '../Loader.constants';

const setLoaderState = payload => {
  return {
    payload,
    type: LOADER_CONSTANTS.SET_LOADER_STATE,
  };
};

export default setLoaderState;
