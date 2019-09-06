import { connect } from 'react-redux';

import { toggleApplyNowModal, togglePLCCFormModal } from './ApplyNowModal.actions';
import { getLabels, getIsModalOpen, getIsPLCCModalOpen } from './ApplyNowModal.selectors';
import ApplyNowModalWrapper from '../views';
import { resetPLCCResponse } from '../../../../features/browse/ApplyCardPage/container/ApplyCard.actions';

export const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
    togglePLCCFormModal: payload => {
      dispatch(togglePLCCFormModal(payload));
    },
    resetPLCCApplicationStatus: payload => {
      dispatch(resetPLCCResponse(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    isModalOpen: getIsModalOpen(state),
    labels: getLabels(state),
    isPLCCModalOpen: getIsPLCCModalOpen(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyNowModalWrapper);
