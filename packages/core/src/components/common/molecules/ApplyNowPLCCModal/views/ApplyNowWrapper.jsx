import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '@tcp/core/src/components/common/atoms';

import StyledApplyNowModal from './ApplyNowModal.view';

/**
 * @class ApplyNowModalWrapper - Invokes apply plccc node application
 * A Modal will be opened by clicking apply now button
 */
class ApplyNowModalWrapper extends React.Component {
  openModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
  };

  closeModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false });
  };

  render() {
    const { className, labels, isModalOpen } = this.props;
    return (
      <div className={className}>
        <React.Fragment>
          <StyledApplyNowModal
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}
            labels={labels}
          />
        </React.Fragment>
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="primary"
          text={labels.apply_now_link_modal}
          onClick={this.openModal}
          underline
        />
      </div>
    );
  }
}

ApplyNowModalWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ApplyNowModalWrapper;
