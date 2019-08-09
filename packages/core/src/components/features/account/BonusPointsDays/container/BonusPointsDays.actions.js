import BONUS_POINTS_DAYS_CONSTANTS from '../BonusPointsDays.constants';

export const getBonusDays = () => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.GET_BONUS_DAYS,
  };
};

export const showLoader = () => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.SHOW_LOADER,
  };
};

export const setBonusDaysSuccess = payload => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.SET_BONUS_DAYS_SUCCESS,
    payload,
  };
};

export const setBonusDaysError = payload => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.SET_BONUS_DAYS_ERROR,
    payload,
  };
};

export const fetchModuleX = payload => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.FETCH_MODULEX_CONTENT,
    payload,
  };
};

export const setModuleX = payload => {
  return {
    type: BONUS_POINTS_DAYS_CONSTANTS.SET_MODULEX_CONTENT,
    payload,
  };
};
