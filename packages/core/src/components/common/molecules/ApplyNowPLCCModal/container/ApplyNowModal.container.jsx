import { connect } from 'react-redux';

import { toggleApplyNowModal } from './ApplyNowModal.actions';
import { getLabels, getIsModalOpen } from './ApplyNowModal.selectors';
import ApplyNowModalWrapper from '../views';

export const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    isModalOpen: getIsModalOpen(state),
    labels: getLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyNowModalWrapper);
