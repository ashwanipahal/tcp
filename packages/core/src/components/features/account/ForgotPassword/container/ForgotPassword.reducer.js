import { fromJS } from 'immutable';
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';

const initialState = fromJS({
  showNotification: false,
});

const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESS:
      return state.set('showNotification', action.payload.state);
    case FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE:
      return fromJS(action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ForgotPasswordReducer;
