import HEADER_CONSTANTS from './Header.constants';

export const loadHeaderData = payload => {
  return {
    payload,
    type: HEADER_CONSTANTS.LOAD_HEADER_DATA,
  };
};

export default {
  loadHeaderData,
};
