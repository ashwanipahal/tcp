import { fromJS } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';

const initialState = fromJS({
  orderDetails: {},
  errors: false,
  needHelpContent: null,
});

const BagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state.set('orderDetails', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS:
      return state.set('errors', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('needHelpContent', fromJS(action.payload.richText));
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default BagPageReducer;
