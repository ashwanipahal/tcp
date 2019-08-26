import constants from '../RewardsCard.constants';

/**
 * @const - fetchModuleX
 * @param - payload - accepts contentIds object to fetch module data against.
 *
 * @description - fetchModuleX action to fetch the content.
 */
export const fetchModuleX = payload => {
  return {
    payload,
    type: constants.FETCH_MODULEX_CONTENT,
  };
};

/**
 * @const - setModuleX
 *
 * @description - setting the modulesX data.
 */
export const setModuleX = payload => {
  return {
    payload,
    type: constants.SET_MODULEX_CONTENT,
  };
};

/**
 * @const - submitInstantCardApplication
 * @param - payload- payload accepts form data for PLCC Card application.
 *
 * @description - sending the PLCC request.
 */
export const submitInstantCardApplication = payload => {
  return {
    payload,
    type: constants.SEND_INSTANT_CARD_APPLICATION,
  };
};

/**
 * @const - obtainInstantCardApplication
 * @param - payload- contains the data of PLCC application request.
 *
 * @description - fetching the instant status of applied PLCC card.
 */
export const obtainInstantCardApplication = payload => {
  return {
    payload,
    type: constants.RESPONSE_SEND_INSTANT_CARD_APPLICATION,
  };
};
