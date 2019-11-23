import OUTFIT_DETAIL_CONSTANTS from './OutfitDetails.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const OutfitDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OUTFIT_DETAIL_CONSTANTS.SET_OUTFIT_PRODUCTS:
      return { ...state, currentOutfit: action.currentOutfit };
    case OUTFIT_DETAIL_CONSTANTS.SET_ADD_TO_FAVORITE:
      // eslint-disable-next-line no-case-declarations
      const outfitDetailsMap = state.currentOutfit;
      // eslint-disable-next-line consistent-return
      outfitDetailsMap.products = outfitDetailsMap.products.map(outfitDetails => {
        // eslint-disable-next-line no-param-reassign
        outfitDetails.colorFitsSizesMap = outfitDetails.colorFitsSizesMap.map(item => {
          if (item.colorDisplayId === action.payload.colorProductId) {
            // eslint-disable-next-line no-param-reassign
            item = {
              ...item,
              isFavorite: true,
              favoritedCount: action.payload.res && action.payload.res.favoritedCount,
            };
          }
          return item;
        });
        return outfitDetails;
      });

      return { ...state, currentOutfit: { ...currentOutfit, products: { ...outfitDetailsMap } } };
    default:
      return { ...state };
  }
};

export default OutfitDetailReducer;
