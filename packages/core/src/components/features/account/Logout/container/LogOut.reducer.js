import { fromJS } from 'immutable';
import LOGOUT_CONSTANTS from '../LogOut.constants';

const initialState = fromJS({
  toggleSuccessfulEmailSection: null,
});

const LogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_CONSTANTS.SET_LOGIN_INFO:
      return state.set('toggleSuccessfulEmailSection', true);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default LogoutReducer;
