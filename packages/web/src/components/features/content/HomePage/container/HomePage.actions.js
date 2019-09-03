// TODO - GLOBAL-LABEL-CHANGE -  STEP 2.1 - Uncomment these reference
// import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
// import { LABELS } from '@tcp/core/src/reduxStore/constants';

import HOMEPAGE_CONSTANTS from '../HomePage.constants';

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

export const initActions = [];

// TODO - GLOBAL-LABEL-CHANGE -  STEP 2.2 - sample code provided for reference - Remove it if not required
// export const initActions = [
//   loadComponentLabelsData({ category: LABELS.modules
// })
// ];
