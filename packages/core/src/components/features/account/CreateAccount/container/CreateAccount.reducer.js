import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../CreateAccount.constants';

const initialState = fromJS({
  error: null,
  isLoading: false,
});
let checkErrorReset = false;

const returnCreateAccountReducer = (state = initialState) => {
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const CreateAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LOADING_STATE:
      return state.set('isLoading', action.payload.isLoading);
    case constants.CREATE_AN_ACCOUNT:
      return state.set('error', null);
    case constants.CREATE_AN_ACCOUNT_ERR:
      return state.set('error', fromJS(action.payload));
    case constants.RESET_CREATE_AN_ACCOUNT_ERR:
      return state.set('error', null);
    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.CREATE_ACCOUNT_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.CREATE_ACCOUNT_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    default:
      return returnCreateAccountReducer(state);
  }
};

export default CreateAccountReducer;
