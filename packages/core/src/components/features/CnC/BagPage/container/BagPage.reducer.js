import { fromJS } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';

const initialState = fromJS({
  itemInfo: {},
  error: false,
  isOpenAddedToBag: false,
});

const BagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.SET_ADDED_TO_BAG:
      return state.set('itemInfo', fromJS(action.payload));
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default BagPageReducer;
