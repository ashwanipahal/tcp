import { fromJS } from 'immutable';
import TRACK_ORDER_CONSTANTS from '../TrackOrder.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  showNotificationOnModal: null,
  trackOrderMountedState: false,
});

const TrackOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_ORDER_CONSTANTS.SET_TRACK_ORDER_MODAL_MOUNTED_STATE:
      return state
        .set('trackOrderMountedState', action.payload.state)
        .set('showNotificationOnModal', null);
    case TRACK_ORDER_CONSTANTS.SET_ORDER_DETAIL_INFO:
      return state.set('trackOrderInfo', action.payload);
    case TRACK_ORDER_CONSTANTS.SET_ERROR_INFO:
      return state.set('showNotificationOnModal', action.payload.message);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default TrackOrderReducer;
