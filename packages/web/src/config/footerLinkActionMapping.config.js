import { setLoginModalMountedState } from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';

export const footerLinksActionMappingConfig = {
  'track-order': setTrackOrderModalMountedState,
  '/track-order': setTrackOrderModalMountedState,
  favorites: setLoginModalMountedState,
  '/favorites': setLoginModalMountedState,
  'log-out': logout,
  '/log-out': logout,
  'login-account': openOverlayModal,
  '/login-account': openOverlayModal,
  'create-account': openOverlayModal,
  '/create-account': openOverlayModal,
  'check-point-balance': openOverlayModal,
  '/check-point-balance': openOverlayModal,
  'redeem-rewards': openOverlayModal,
  '/redeem-rewards': openOverlayModal,
};

export default footerLinksActionMappingConfig;
