import { fromJS } from 'immutable';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

const initialState = fromJS({
  error: null,
  loginModalMountedState: false,
  checkoutModalMountedState: false,
  loginErrorMessage: null,
  componentType: LOGINPAGE_CONSTANTS.PAGE_TYPE.LOGIN,
  isLoading: false,
});

const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.LOGIN:
      return state.set('error', null);
    case LOGINPAGE_CONSTANTS.SET_LOGIN_LOADING_STATE:
      return state.set('isLoading', action.payload.isLoading);
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return state.set('error', fromJS(action.payload));
    case LOGINPAGE_CONSTANTS.RESET_LOGIN_INFO:
      return state.set('error', null);
    case LOGINPAGE_CONSTANTS.LOGIN_MODAL_MOUNTED_STATE:
      return state.set('loginModalMountedState', action.payload.state);
    case LOGINPAGE_CONSTANTS.CHECKOUT_MODAL_MOUNTED_STATE:
      return state
        .set('checkoutModalMountedState', action.payload.state)
        .set(
          'componentType',
          action.payload.state
            ? action.payload.componentType || LOGINPAGE_CONSTANTS.PAGE_TYPE.LOGIN
            : LOGINPAGE_CONSTANTS.PAGE_TYPE.LOGIN
        );
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LoginPageReducer;
