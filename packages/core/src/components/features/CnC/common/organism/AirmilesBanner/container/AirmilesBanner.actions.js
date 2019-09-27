import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';

// @flow
export const addAirmilesBannerRequest = () => {
  return {
    type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST,
  };
};

export const addAirmilesBannerFailure = (payload: {}) => {
  return {
    type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_FAILED,
    payload,
  };
};
/**
 * @function resetAirmilesReducer
 * action creator for type: RESET_AIRMILES_BANNER
 */
export const resetAirmilesReducer = () => {
  return {
    type: AIRMILES_BANNER_CONSTANTS.RESET_AIRMILES_BANNER,
  };
};
