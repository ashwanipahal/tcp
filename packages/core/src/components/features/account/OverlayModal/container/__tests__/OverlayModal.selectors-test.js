import { fromJS } from 'immutable';
import { getComponent, getVariation, getColor, getOpenState } from '../OverlayModal.selectors';

describe('#OverlayModal selector', () => {
  it('#getComponent should return openOverlay state', () => {
    const OverlayModalState = fromJS({
      openOverlay: false,
      component: null,
      variation: 'primary',
      color: null,
    });
    const state = {
      OverlayModalReducer: OverlayModalState,
    };

    expect(getComponent(state)).toEqual(OverlayModalState.get('component'));
    expect(getOpenState(state)).toEqual(OverlayModalState.get('openOverlay'));
    expect(getColor(state)).toEqual(OverlayModalState.get('color'));
    expect(getVariation(state)).toEqual(OverlayModalState.get('variation'));
  });
});
