import { fromJS } from 'immutable';
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';

const initialState = fromJS({
  showNotification: false,
  toggleSuccessfulEmailSection: null,
  error: null,
});

const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESS:
      return state.set('toggleSuccessfulEmailSection', true);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_FAIL:
      return state.set('showNotification', action.payload.state);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_LOGIN_STATE:
      return state
        .set('showNotification', false)
        .set('toggleSuccessfulEmailSection', null)
        .set('error', null);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESSFULL_EMAIL:
      return state.set('toggleSuccessfulEmailSection', true);
    case FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE:
      return state.set('error', fromJS(action.payload)).set('showNotification', true);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ForgotPasswordReducer;
