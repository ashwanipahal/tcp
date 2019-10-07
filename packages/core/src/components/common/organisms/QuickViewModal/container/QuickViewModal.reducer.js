import { fromJS } from 'immutable';
import QUICK_VIEW_CONSTANT from './QuickViewModal.constants';
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

const QuickViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK_VIEW_CONSTANT.SET_QUICK_VIEW:
      return state.set('quickViewProduct', action.payload.product);
    case QUICK_VIEW_CONSTANT.SET_ITEM_FROM_BAG_INFO:
      return state.set('quickViewProductFromBag', action.payload.orderInfo);
    case QUICK_VIEW_CONSTANT.OPEN_QUICK_VIEW_MODAL:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case QUICK_VIEW_CONSTANT.CLOSE_QUICK_VIEW_MODAL:
      state.set('isModalOpen', action.payload.isModalOpen);
      return state.set('quickViewProduct', null);
    default:
      return getDefaultState(state);
  }
};

export default QuickViewReducer;
