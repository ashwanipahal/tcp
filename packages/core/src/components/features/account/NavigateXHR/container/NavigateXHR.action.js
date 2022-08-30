import NAVIGATE_XHR_CONSTANTS from './NavigateXHR.constants';

export const navigateXHRAction = payload => {
  return {
    type: NAVIGATE_XHR_CONSTANTS.NAVIGATE_XHR_STATE,
    payload,
  };
};

export default { navigateXHRAction };
