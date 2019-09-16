import { fromJS } from 'immutable';
import SOCIAL_CONSTANTS from '../social.constants';

const initialState = fromJS({
  socialDataOnLoad: {},
});

const SocialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_CONSTANTS.SOCIAL_LOAD_DATA:
      return state.set('socialDataOnLoad', action.payload);

    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default SocialReducer;
