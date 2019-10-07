import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';

export const fetchPromoList = payload => {
  return {
    payload,
    type: EXTRA_POINTS_CONSTANTS.FETCH_PROMO_LIST_CONTENT,
  };
};

export const setPromoList = payload => {
  return {
    payload,
    type: EXTRA_POINTS_CONSTANTS.SET_PROMO_LIST_CONTENT,
  };
};
