import { connect } from 'react-redux';

import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleApplyNowModal } from '../../ApplyNowPLCCModal/container/ApplyNowModal.actions';
import EspotComponent from '../views';

export const mapDispatchToProps = dispatch => {
  return {
    togglePlccModal: payload => {
      dispatch(
        toggleApplyNowModal({
          isModalOpen: payload || false,
        })
      );
    },
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EspotComponent);
