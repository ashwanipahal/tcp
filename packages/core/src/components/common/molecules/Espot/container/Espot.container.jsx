import { connect } from 'react-redux';

import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleApplyNowModal } from '../../ApplyNowPLCCModal/container/ApplyNowModal.actions';
import EspotComponent from '../views/Espot.view';

export const mapDispatchToProps = dispatch => {
  return {
    togglePlccModal: payload => {
      dispatch(
        toggleApplyNowModal({
          isModalOpen: payload || false,
        })
      );
    },
    openLoginOverlay: () => {
      openOverlayModal({
        component: 'login',
        variation: 'primary',
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EspotComponent);
