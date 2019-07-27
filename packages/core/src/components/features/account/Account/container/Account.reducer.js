import { fromJS } from 'immutable';
import ACCOUNT_CONSTANTS from '../Account.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  isFetching: false,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case ACCOUNT_CONSTANTS.SET_ACCOUNT_NAVIGATION_LIST:
      return state
        .set('accountNavigation', action)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(ACCOUNT_CONSTANTS.GET_ACCOUNT_NAV_LIST_TTL));
    default:
      return getDefaultState(state);
  }
};

export default AccountReducer;
