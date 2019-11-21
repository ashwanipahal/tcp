import { fromJS } from 'immutable';
import OVERLAY_CONSTANTS from './OverlayModal.constants';

const initialState = fromJS({
  openOverlay: false,
  component: null,
  variation: 'primary',
  color: null,
  componentProps: null,
});

const OverlayModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OVERLAY_CONSTANTS.OPEN_OVERLAY:
      return state
        .set('openOverlay', true)
        .set('component', action.payload.component)
        .set('variation', action.payload.variation)
        .set('color', action.payload.color)
        .set('componentProps', action.payload.componentProps);
    case OVERLAY_CONSTANTS.CLOSE_OVERLAY:
      return state
        .set('openOverlay', false)
        .set('component', null)
        .set('variation', 'primary')
        .set('color', null)
        .set('componentProps', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default OverlayModalReducer;
