import React from 'react';
import PropTypes from 'prop-types';

import StyledApplyNowModal from '../../molecules/ApplyNowModal/views/ApplyNowModal.view';

/**
 * @class ApplyNowModalWrapper - Invokes apply plccc node application
 * A Modal will be opened by clicking apply now button
 */

class ApplyNowModalWrapper extends React.Component {
  componentDidMount() {
    const {
      labels,
      fetchModuleXContent,
      resetPLCCApplicationStatus,
      isModalOpen,
      isPLCCModalOpen,
    } = this.props;

    if (labels && labels.referred && (isModalOpen || isPLCCModalOpen)) {
      fetchModuleXContent(labels.referred);
    }
    resetPLCCApplicationStatus({ status: null });
  }

  componentDidUpdate(prevProps) {
    const { isModalOpen, isPLCCModalOpen, labels, fetchModuleXContent } = this.props;

    if (
      ((!prevProps.isModalOpen && isModalOpen) ||
        (!prevProps.isPLCCModalOpen && isPLCCModalOpen)) &&
      labels &&
      labels.referred
    ) {
      fetchModuleXContent(labels.referred);
    }
  }

  setRTPSFlow = () => {
    const { setIsRTPSFlow, isRtpsFlow, submitAcceptOrDeclinePlcc } = this.props;
    /* istanbul ignore else */
    if (isRtpsFlow && setIsRTPSFlow) {
      submitAcceptOrDeclinePlcc(false);
      setIsRTPSFlow(false);
    }
  };

  closeModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false });
    this.setRTPSFlow();
  };

  closePLCCModal = () => {
    const { toggleModal, resetPLCCApplicationStatus } = this.props;
    toggleModal({ isPLCCModalOpen: false });
    resetPLCCApplicationStatus({ status: null });
    this.setRTPSFlow();
  };

  openModal = e => {
    e.preventDefault();
    const { toggleModal, resetPLCCApplicationStatus } = this.props;
    toggleModal({ isModalOpen: true });
    resetPLCCApplicationStatus({ status: null });
  };

  openPLCCModal = e => {
    e.preventDefault();
    const {
      toggleModal,
      isRtpsFlow,
      submitAcceptOrDeclinePlcc,
      resetPLCCApplicationStatus,
    } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
    resetPLCCApplicationStatus({ status: null });
    /* istanbul ignore else */
    if (isRtpsFlow) {
      submitAcceptOrDeclinePlcc(true);
    }
  };

  render() {
    const {
      className,
      labels,
      isModalOpen,
      isPLCCModalOpen,
      plccBenefitsList,
      isRtpsFlow,
      rtpsCongratsMsg,
      rtpsOptOutMsg,
      rtpsTextTerms,
      submitAcceptOrDeclinePlcc,
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
              isRtpsFlow={isRtpsFlow}
              rtpsCongratsMsg={rtpsCongratsMsg}
              rtpsOptOutMsg={rtpsOptOutMsg}
              rtpsTextTerms={rtpsTextTerms}
              submitAcceptOrDeclinePlcc={submitAcceptOrDeclinePlcc}
            />
          ) : null}
        </React.Fragment>
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
  rtpsCongratsMsg: PropTypes.string.isRequired,
  rtpsOptOutMsg: PropTypes.string.isRequired,
  rtpsTextTerms: PropTypes.string.isRequired,
  setIsRTPSFlow: PropTypes.func.isRequired,
  isRtpsFlow: PropTypes.bool,
  submitAcceptOrDeclinePlcc: PropTypes.func.isRequired,
};

ApplyNowModalWrapper.defaultProps = {
  isRtpsFlow: false,
};

export default ApplyNowModalWrapper;
