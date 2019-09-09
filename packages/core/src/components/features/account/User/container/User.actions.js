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
