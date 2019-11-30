import { fromJS } from 'immutable';
import QUICK_VIEW_CONSTANT from './QuickViewModal.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  isLoading: false,
  [DEFAULT_REDUCER_KEY]: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const QuickViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK_VIEW_CONSTANT.SET_QUICK_VIEW:
      return state.set('quickViewProducts', action.payload);
    case QUICK_VIEW_CONSTANT.SET_ITEM_FROM_BAG_INFO:
      return state
        .set('fromBagPage', action.payload.fromBagPage)
        .set('isSflProduct', action.payload.isSflProduct)
        .set('quickViewProductFromBag', action.payload.orderInfo);
    case QUICK_VIEW_CONSTANT.SET_LOADING_STATE:
      return state.set('isLoading', action.payload.isLoading);
    case QUICK_VIEW_CONSTANT.OPEN_QUICK_VIEW_MODAL:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case QUICK_VIEW_CONSTANT.CLOSE_QUICK_VIEW_MODAL:
      return state
        .set('fromBagPage', false)
        .set('isSflProduct', false)
        .set('isModalOpen', action.payload.isModalOpen)
        .set('quickViewProducts', null)
        .set('quickViewProductFromBag', null);

    case QUICK_VIEW_CONSTANT.SET_COLOR_PRODUCT_ID:
      return state.set('selectedColorId', action.payload);

    default:
      return getDefaultState(state);
  }
};

export default QuickViewReducer;
