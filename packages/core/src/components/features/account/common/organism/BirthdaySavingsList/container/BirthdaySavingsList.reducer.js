import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../BirthdaySavingsList.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

let checkErrorReset = false;

const returnBirthdaySavingsListReducer = (state = initialState) => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
};

const BirthdaySavingsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_CHILDREN:
      return state.set('error', null).set('success', null);
    case constants.BIRTHDAY_SAVING_UPDATE_SUCCESS:
      return state.set('error', null).set('success', fromJS(action.payload));
    case constants.BIRTHDAY_SAVING_UPDATE_ERROR:
      return state.set('error', fromJS(action.payload)).set('success', null);
    case constants.RESET_BIRTHDAY_SAVING_MESSAGE:
      return state.set('error', null).set('success', null);
    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.ADD_CHILD_BIRTHDAY_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.ADD_CHILD_BIRTHDAY_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    default:
      return returnBirthdaySavingsListReducer(state);
  }
};

export default BirthdaySavingsListReducer;
