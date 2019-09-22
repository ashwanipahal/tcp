import { fromJS } from 'immutable';
import SOCIAL_CONSTANTS from '../social.constants';

const initialState = fromJS({
  socialDataOnLoad: {},
  pointModalMountState: false,
});

const SocialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_CONSTANTS.SET_SOCIAL_LOAD:
      return state.set('socialDataOnLoad', action.payload);
    case SOCIAL_CONSTANTS.POINT_MODAL_MOUNT_STATE:
      return state.set('pointModalMountState', action.payload.state);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default SocialReducer;
