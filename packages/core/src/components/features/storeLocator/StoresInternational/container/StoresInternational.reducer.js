import { fromJS } from 'immutable';
import STORES_INTL_CONSTANTS from './StoresInternational.constants';

const initialState = fromJS({
  moduleXContent: '',
});

// TBD: Update reducers for container components with contextual ones
const StoresInternationalReducer = (state = initialState, action) => {
  if (action.type === STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_SET_MODULEX) {
    return state.set('moduleXContent', action.payload);
  }
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

export default StoresInternationalReducer;
