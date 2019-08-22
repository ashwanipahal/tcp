import { fromJS } from 'immutable';
import constants from '../ChangePassword.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const ChangePasswordReducer = (state, action) => {
  switch (action.type) {
    case constants.CHANGE_PASSWORD_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.CHANGE_PASSWORD_ERROR:
      return state.set('error', action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }

      if (typeof state === 'undefined') {
        return initialState;
      }
      return state;
  }
};

export default ChangePasswordReducer;
