import { fromJS } from 'immutable';
import constants from '../MyPrefrence.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

const MyPrefrenceReducer = (state, action) => {
  switch (action.type) {
    case constants.UPDATE_PROFILE_SUCCESS:
      return state.set('error', null).set('success', action.payload);
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

export default MyPrefrenceReducer;
