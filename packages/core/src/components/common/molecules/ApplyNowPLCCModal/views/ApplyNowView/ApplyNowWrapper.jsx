import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '../../../../../../utils';
import { Anchor } from '../../../../atoms';

import StyledApplyNowModal from '../../molecules/ApplyNowModal/views/ApplyNowModal.view';

/**
 * @class ApplyNowModalWrapper - Invokes apply plccc node application
 * A Modal will be opened by clicking apply now button
 */

class ApplyNowModalWrapper extends React.Component {
  componentDidMount() {
    const { labels, fetchModuleXContent, resetPLCCApplicationStatus } = this.props;
    if (labels && labels.referred) {
      fetchModuleXContent(labels.referred);
    }
    resetPLCCApplicationStatus({ status: null });
  }

  closeModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false });
  };

  closePLCCModal = () => {
    const { toggleModal, resetPLCCApplicationStatus } = this.props;
    toggleModal({ isPLCCModalOpen: false });
    resetPLCCApplicationStatus({ status: null });
  };

  openModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
  };

  openPLCCModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
  };

  render() {
    const {
      className,
      labels,
      isModalOpen,
      isPLCCModalOpen,
      plccBenefitsList,
      labelText,
    } = this.props;
    return (
      <div className={className}>
        <React.Fragment>
          {isModalOpen || isPLCCModalOpen ? (
            <StyledApplyNowModal
              isModalOpen={isModalOpen}
              isPLCCModalOpen={isPLCCModalOpen}
              openPLCCModal={this.openPLCCModal}
              closePLCCModal={this.closePLCCModal}
              closeModal={this.closeModal}
              labels={labels}
              plccBenefitsList={plccBenefitsList}
            />
          ) : null}
        </React.Fragment>
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="primary"
          text={labelText || getLabelValue(labels, 'lbl_PLCCModal_applyNowLink')}
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
  isPLCCModalOpen: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
  fetchModuleXContent: PropTypes.func.isRequired,
  plccBenefitsList: PropTypes.string.isRequired,
  labelText: PropTypes.string,
};

ApplyNowModalWrapper.defaultProps = {
  labelText: '',
};

export default ApplyNowModalWrapper;
