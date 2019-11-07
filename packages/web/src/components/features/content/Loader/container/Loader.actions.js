import LOADER_CONSTANTS from '../Loader.constants';

export const setLoaderState = payload => {
  return {
    payload,
    type: LOADER_CONSTANTS.SET_LOADER_STATE,
  };
};
export const closePageSpinner = () => {
  return {
    type: LOADER_CONSTANTS.CLOSE_PAGE_SPINNER,
  };
};

export const openPageSpinner = () => {
  return {
    type: LOADER_CONSTANTS.OPEN_PAGE_SPINNER,
  };
};

export default setLoaderState;
