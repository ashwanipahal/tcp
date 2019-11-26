import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../AddEditPersonalInformation.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

let checkErrorReset = false;

const UpdateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_PROFILE_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.ADD_PROFILE_INFORMATION_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.ADD_PROFILE_INFORMATION_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    case constants.UPDATE_PROFILE_ERROR:
      return state.set('error', fromJS(action.payload));
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

export default UpdateProfileReducer;
