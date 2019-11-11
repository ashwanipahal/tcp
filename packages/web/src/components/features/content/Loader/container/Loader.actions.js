import LOADER_CONSTANTS from '../Loader.constants';

export const setLoaderState = payload => {
  return {
    payload,
    type: LOADER_CONSTANTS.SET_LOADER_STATE,
  };
};

export const setSectionLoaderState = payload => {
  return {
    payload,
    type: LOADER_CONSTANTS.SET_SECTION_LOADER_STATE,
  };
};

export default setLoaderState;
