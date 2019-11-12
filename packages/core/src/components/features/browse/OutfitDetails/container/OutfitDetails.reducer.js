import OUTFIT_DETAIL_CONSTANTS from './OutfitDetails.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const OutfitDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OUTFIT_DETAIL_CONSTANTS.SET_OUTFIT_PRODUCTS:
      return { ...state, currentOutfit: action.currentOutfit };
    default:
      return { ...state };
  }
};

export default OutfitDetailReducer;
