import { OUTFIT_DETAILS_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getLabelValue } from '../../../../../utils';

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.Outfit;
};

export const getPDPLabels = state => {
  return {
    completeTheLook: getLabelValue(state.Labels, 'lbl_complete_the_look', 'PDP', 'Browse'),
    youMayAlsoLike: getLabelValue(state.Labels, 'lbl_you_may_also_like', 'PDP', 'Browse'),
    recentlyViewed: getLabelValue(state.Labels, 'lbl_recently_viewed', 'PDP', 'Browse'),
  };
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

export const getUnavailableCount = state => {
  return (
    state[OUTFIT_DETAILS_REDUCER_KEY] &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit &&
    state[OUTFIT_DETAILS_REDUCER_KEY].currentOutfit.unavailableCount
  );
};

export const getAddedToBagErrorCatId = state => {
  return state.AddedToBagReducer.get('errorCatId');
};

export const getLoadingState = state => {
  return state[OUTFIT_DETAILS_REDUCER_KEY] && state[OUTFIT_DETAILS_REDUCER_KEY].isLoading;
};
