import { fromJS } from 'immutable';
import GLOBAL_CONSTANTS from '../constants';

const initialState = fromJS({
  siteDetails: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const SessionConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_XAPP_CONFIG:
      return state.set('siteDetails', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default SessionConfigReducer;
