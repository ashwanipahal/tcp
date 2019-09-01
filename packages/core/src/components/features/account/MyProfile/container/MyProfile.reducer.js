import { fromJS } from 'immutable';
import constants from '../MyProfile.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const MyProfileReducer = (state, action) => {
  switch (action.type) {
    case constants.MY_PROFILE_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.MY_PROFILE_ERROR:
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

export default MyProfileReducer;
