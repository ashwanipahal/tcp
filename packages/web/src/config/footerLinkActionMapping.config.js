import { setLoginModalMountedState } from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';

export const footerLinksActionMappingConfig = {
  'track-order': setTrackOrderModalMountedState,
  favorites: setLoginModalMountedState,
  'log-out': logout,
  'login-account': openOverlayModal,
  '/login-account': openOverlayModal,
  'create-account': openOverlayModal,
  '/create-account': openOverlayModal,
};

export default footerLinksActionMappingConfig;
