import { fromJS } from 'immutable';
import constants from '../BirthdaySavingsList.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const BirthdaySavingsListReducer = (state, action) => {
  switch (action.type) {
    case constants.BIRTHDAY_SAVING_UPDATE_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.BIRTHDAY_SAVING_UPDATE_ERROR:
      return state.set('error', action.payload).set('success', null);
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

export default BirthdaySavingsListReducer;
