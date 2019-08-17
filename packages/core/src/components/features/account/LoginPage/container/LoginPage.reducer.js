import { fromJS } from 'immutable';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  userInfo: null
});

const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return state.set('userInfo', fromJS(action.payload)).set(DEFAULT_REDUCER_KEY, setCacheTTL(LOGINPAGE_CONSTANTS.GET_USER_INFO_TTL));
    case LOGINPAGE_CONSTANTS.RESET_LOGIN_INFO:
      return state.set('userInfo', null).set(DEFAULT_REDUCER_KEY, null);
    case LOGINPAGE_CONSTANTS.CLEAR_USER_INFO_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LoginPageReducer;
