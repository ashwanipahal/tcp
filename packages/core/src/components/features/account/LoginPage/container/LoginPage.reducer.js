import { fromJS } from 'immutable';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

const initialState = null;

const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return fromJS(action.payload);
    case LOGINPAGE_CONSTANTS.SET_LOGIN_ERROR:
      return fromJS({
        error: true
      });
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LoginPageReducer;
