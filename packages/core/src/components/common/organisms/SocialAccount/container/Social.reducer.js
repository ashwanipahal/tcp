import { fromJS } from 'immutable';
import SOCIAL_CONSTANTS from '../social.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  socialDataOnLoad: {},
  pointModalMountState: false,
  isFetching: false,
});

const SocialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case SOCIAL_CONSTANTS.SET_SOCIAL_LOAD:
      return state
        .set('isFetching', false)
        .set('socialDataOnLoad', action.payload)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(SOCIAL_CONSTANTS.GET_SOCIAL_LOAD_TTL));
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
