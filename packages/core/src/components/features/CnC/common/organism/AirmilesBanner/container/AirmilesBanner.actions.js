import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';

// @flow
export const addAirmilesBannerRequest = (payload: {}) => {
  return {
    type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST,
    payload,
  };
};

export const addAirmilesBannerFailure = (payload: {}) => {
  return {
    type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_FAILED,
    payload,
  };
};
