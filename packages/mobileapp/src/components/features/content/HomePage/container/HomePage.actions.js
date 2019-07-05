import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';

export const getHeaderlinks = payload => {
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
