import CONSTANTS from '../User.constants';

export const resetUserInfo = () => {
  return {
    type: CONSTANTS.RESET_USER_INFO,
  };
};

export const clearUserInfo = () => {
  return {
    type: CONSTANTS.CLEAR_USER_INFO_TTL,
  };
};

export const getUserInfo = payload => {
  return {
    type: CONSTANTS.GET_USER_INFO,
    payload,
  };
};

export const setUserInfo = payload => {
  return {
    type: CONSTANTS.SET_USER_INFO,
    payload,
  };
};

/**
 * @function setUserChildren
 * @param { object } payload
 * Action creator for setting user children
 */
export const setUserChildren = payload => {
  return {
    type: CONSTANTS.SET_CHILDREN,
    payload,
  };
};

/**
 * @function setFavoriteStore
 * @param { object } payload
 * Action creator for setting fav store
 */
export const setFavoriteStore = payload => {
  return {
    type: CONSTANTS.SET_FAVORITE_STORE,
    payload,
  };
};
export const setSurveyQuestions = payload => {
  return {
    type: CONSTANTS.SET_SURVEY_QUESTIONS,
    payload,
  };
};

export const setSurveyAnswers = payload => {
  return {
    type: CONSTANTS.SET_SURVEY_ANSWERS,
    payload,
  };
};

export function setUserGeoCoordinates(payload) {
  return {
    payload,
    type: CONSTANTS.SET_GEO_COORDINATES,
  };
}

export const setDefaultStore = payload => ({
  payload,
  type: CONSTANTS.SET_DEFAULT_STORE,
});

/**
 * @function setIsExpressEligible
 * @param { object } payload
 * Action creator for setting user children
 */
export const setIsExpressEligible = payload => {
  return {
    type: CONSTANTS.SET_IS_EXPRESS_ELIGIBLE,
    payload,
  };
};

/**
 * @function setIsRegisteredUserCallDone
 * @param { object } payload
 * Action creator for setting user children
 */
export const setIsRegisteredUserCallDone = () => {
  return {
    type: CONSTANTS.SET_IS_REGISTERED_USER_CALL_DONE,
  };
};
