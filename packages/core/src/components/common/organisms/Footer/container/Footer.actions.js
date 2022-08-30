import FOOTER_CONSTANTS from './Footer.constants';

export const loadFooterData = payload => {
  return {
    payload,
    type: FOOTER_CONSTANTS.LOAD_FOOTER_DATA,
  };
};

export default {
  loadFooterData,
};
