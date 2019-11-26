import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from './AddEditAddress.constants';

const initialState = fromJS({
  showNotification: false,
  error: null,
});

let checkErrorReset = false;

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_USER_ADDRESS_FAIL:
      return state.set('error', fromJS(action.payload)).set('showNotification', true);
    case constants.ADD_USER_ADDRESS_SUCCESS:
      return fromJS(action.payload);
    case constants.RESET_ADDRESS_STATE:
      return initialState;
    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.ADDRESS_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.ADDRESS_FORM) {
        checkErrorReset = false;
        return state.set('error', null).set('showNotification', false);
      }
      return state;
    }
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddAddressReducer;
