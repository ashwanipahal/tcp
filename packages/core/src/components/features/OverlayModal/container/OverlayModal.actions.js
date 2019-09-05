import OVERLAY_CONSTANTS from './OverlayModal.constants';

export const openOverlayModal = payload => {
  return { type: OVERLAY_CONSTANTS.OPEN_OVERLAY, payload };
};

export const closeOverlayModal = () => {
  return {
    type: OVERLAY_CONSTANTS.CLOSE_OVERLAY,
  };
};
