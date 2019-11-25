import { connect } from 'react-redux';

import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleNeedHelpModalState } from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.actions';
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
    toggleNeedHelpModal: () => {
      dispatch(toggleNeedHelpModalState());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EspotComponent);
