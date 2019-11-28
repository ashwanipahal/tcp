import OUTFIT_DETAILS_CONSTANTS from './OutfitDetails.constants';

export const getOutfitDetails = payload => {
  return {
    type: OUTFIT_DETAILS_CONSTANTS.FETCH_OUTFIT_PRODUCTS,
    payload,
  };
};

export const setCurrentOutfitAction = currentOutfit => {
  return {
    currentOutfit,
    type: OUTFIT_DETAILS_CONSTANTS.SET_OUTFIT_PRODUCTS,
  };
};

export const setAddToFavoriteOUTFIT = payload => {
  return {
    type: OUTFIT_DETAILS_CONSTANTS.SET_ADD_TO_FAVORITE,
    payload,
  };
};

export const setLoadingState = payload => {
  return {
    type: OUTFIT_DETAILS_CONSTANTS.SET_LOADING_STATE,
    payload,
  };
};
