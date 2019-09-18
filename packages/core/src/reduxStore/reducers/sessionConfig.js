import { fromJS } from 'immutable';
import GLOBAL_CONSTANTS from '../constants';

const initialState = fromJS({
  siteDetails: {},
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const mergedSiteDetails = (state, payload) => {
  const mapPayload = fromJS(payload);
  return state.get('siteDetails').merge(mapPayload);
};

const SessionConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_XAPP_CONFIG:
      return state.set('siteDetails', mergedSiteDetails(state, action.payload));
    case GLOBAL_CONSTANTS.SET_BOSS_BOPIS_FLAGS:
      return state.set('siteDetails', mergedSiteDetails(state, action.payload));
    case GLOBAL_CONSTANTS.SET_COUNTRY:
      return state.setIn(['siteDetails', 'country'], action.payload);
    case GLOBAL_CONSTANTS.SET_CURRENCY:
      return state.setIn(['siteDetails', 'currency'], action.payload);
    case GLOBAL_CONSTANTS.SET_LANGUAGE:
      return state.setIn(['siteDetails', 'language'], action.payload);
    default:
      return getDefaultState(state);
  }
};

export default SessionConfigReducer;
