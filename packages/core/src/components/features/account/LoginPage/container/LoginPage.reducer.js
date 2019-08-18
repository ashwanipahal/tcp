import { fromJS } from 'immutable';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

const initialState = fromJS({
  loginModalMountedState: false,
});

const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return fromJS(action.payload);
    case LOGINPAGE_CONSTANTS.RESET_LOGIN_INFO:
      return initialState;
    case LOGINPAGE_CONSTANTS.LOGIN_MODAL_MOUNTED_STATE:
      return state.set('loginModalMountedState', action.payload.state);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LoginPageReducer;
