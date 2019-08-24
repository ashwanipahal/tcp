import { fromJS } from 'immutable';
import constants from '../ResetPassword.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const ResetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RESET_PASSWORD_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.RESET_PASSWORD_ERROR:
      return state.set('error', action.payload).set('success', null);
    case constants.RESET_STATE:
      return state.set('error', null).set('success', null);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ResetPasswordReducer;
