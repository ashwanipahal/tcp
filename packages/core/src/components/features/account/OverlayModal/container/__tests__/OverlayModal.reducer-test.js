import { fromJS } from 'immutable';
import OverlayModalReducer from '../OverlayModal.reducer';
import OVERLAY_CONSTANTS from '../OverlayModal.constants';

describe('OverlayModalReducer', () => {
  it('should set details for overlay redux state', () => {
    const payload = {
      component: 'login',
      variation: 'primary',
      color: 'black',
      componentProps: {},
    };
    const initialState = fromJS({
      openOverlay: false,
      component: null,
      variation: 'primary',
      color: null,
      componentProps: null,
    });
    const expectedState = fromJS({
      openOverlay: true,
      component: 'login',
      variation: 'primary',
      color: 'black',
    }).set('componentProps', {});
    expect(
      OverlayModalReducer(initialState, {
        type: OVERLAY_CONSTANTS.OPEN_OVERLAY,
        payload,
      })
    ).toEqual(expectedState);
  });
  it('should reset details for overlay redux state', () => {
    const payload = fromJS({
      openOverlay: true,
      component: 'login',
      variation: 'primary',
      color: 'black',
      componentProps: {},
    });
    const initialState = fromJS({
      openOverlay: false,
      component: null,
      variation: 'primary',
      color: null,
      componentProps: null,
    });
    expect(
      OverlayModalReducer(initialState, {
        type: OVERLAY_CONSTANTS.CLOSE_OVERLAY,
        payload,
      })
    ).toEqual(
      fromJS({
        openOverlay: false,
        component: null,
        variation: 'primary',
        color: null,
        componentProps: null,
      })
    );
  });
});
