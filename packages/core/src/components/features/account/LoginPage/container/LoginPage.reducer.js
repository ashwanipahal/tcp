import { fromJS } from 'immutable';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

const initialState = fromJS({
  error: null,
  loginModalMountedState: false,
  checkoutModalMountedState: false,
});

const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return state.set('error', fromJS(action.payload));
    case LOGINPAGE_CONSTANTS.RESET_LOGIN_INFO:
      return state.set('error', null);
    case LOGINPAGE_CONSTANTS.LOGIN_MODAL_MOUNTED_STATE:
      return state.set('loginModalMountedState', action.payload.state);
    case LOGINPAGE_CONSTANTS.CHECKOUT_MODAL_MOUNTED_STATE:
      return state.set('checkoutModalMountedState', action.payload.state);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LoginPageReducer;
