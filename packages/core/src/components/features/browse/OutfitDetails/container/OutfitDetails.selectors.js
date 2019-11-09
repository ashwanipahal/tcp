import { OUTFIT_DETAILS_REDUCER_KEY } from '../../../../../constants/reducer.constants';

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.Outfit;
};

export const getOutfitImage = state => {
  return (
    state[OUTFIT_DETAILS_REDUCER_KEY] &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit.outfitImageUrl
  );
};

export const getOutfitProducts = state => {
  return (
    state[OUTFIT_DETAILS_REDUCER_KEY] &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit.products
  );
};

export const getAddedToBagErrorCatId = state => {
  return state.AddedToBagReducer.errorCatId;
};
