import OVERLAY_CONSTANTS from '../OverlayModal.constants';
import { openOverlayModal, closeOverlayModal } from '../OverlayModal.actions';

describe('Overlay  actions', () => {
  it('openOverlayModal should return action type as OPEN_OVERLAY', () => {
    expect(openOverlayModal().type).toBe(OVERLAY_CONSTANTS.OPEN_OVERLAY);
  });

  it('closeOverlayModal should return action type as CLOSE_OVERLAY', () => {
    expect(closeOverlayModal().type).toBe(OVERLAY_CONSTANTS.CLOSE_OVERLAY);
  });
});
