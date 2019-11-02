import { connect } from 'react-redux';

import { toggleApplyNowModal } from '../../ApplyNowPLCCModal/container/ApplyNowModal.actions';
import EspotComponent from '../views/Espot.view';

export const mapDispatchToProps = dispatch => {
  return {
    openApplyNowModal: () => {
      dispatch(
        toggleApplyNowModal({
          isModalOpen: true,
        })
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EspotComponent);
