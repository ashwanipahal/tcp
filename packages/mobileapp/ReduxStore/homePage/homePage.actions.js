import { HOMEPAGE_CONSTANTS } from './homePage.constants';

export const getHeaderlinks = payload => {
  //TODO: Move it to _APP.js Actions
  return {
    payload,
    type: HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS,
  };
};

export const setHeaderlinks = payload => {
  return {
    payload,
    type: HOMEPAGE_CONSTANTS.SET_HEADER_LINKS,
  };
};

export const getEspots = payload => {
  return {
    payload,
    type: HOMEPAGE_CONSTANTS.FETCH_ESPOT,
  };
};

export const setEspots = payload => {
  return {
    payload,
    type: HOMEPAGE_CONSTANTS.SET_ESPOST,
  };
};

export const initActions = [getHeaderlinks()];
