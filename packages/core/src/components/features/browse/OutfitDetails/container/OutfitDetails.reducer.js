import { fromJS } from 'immutable';
import OUTFIT_DETAIL_CONSTANTS from './OutfitDetails.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const OutfitDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OUTFIT_DETAIL_CONSTANTS.SET_OUTFIT_PRODUCTS:
      return state.set('currentOutfit', action.currentOutfit);
    default:
      return getDefaultState(state);
  }
};

export default OutfitDetailReducer;
