import { setLoginModalMountedState } from '../components/features/account/LoginPage/container/LoginPage.actions';
import { setTrackOrderModalMountedState } from '../components/features/account/TrackOrder/container/TrackOrder.actions';
import { logout } from '../components/features/account/Logout/container/LogOut.actions';
import { openOverlayModal } from '../components/features/OverlayModal/container/OverlayModal.actions';

export const footerLinksActionMappingConfig = {
  'track-order': setTrackOrderModalMountedState,
  favorites: setLoginModalMountedState,
  'log-out': logout,
  'my-account': openOverlayModal,
};

export default footerLinksActionMappingConfig;
