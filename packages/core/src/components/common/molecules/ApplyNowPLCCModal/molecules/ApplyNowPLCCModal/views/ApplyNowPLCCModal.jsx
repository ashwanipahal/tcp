import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../Modal';
import ApplyCardPage from '../../../../../../features/browse/ApplyCardPage';
import { getLocator } from '../../../../../../../utils';

const ApplyNowPLCCModal = ({
  modalStyles,
  isPLCCModalOpen,
  closePLCCModal,
  className,
  isRtpsFlow,
}) => {
  return (
    <Modal
      fixedWidth
      isOpen={isPLCCModalOpen}
      onRequestClose={closePLCCModal}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
      dataLocator={getLocator('plcc_apply_now_modal')}
      dataLocatorHeader={getLocator('plcc_apply_now_close_btn')}
      maxWidth="724px"
      inheritedStyles={modalStyles}
      shouldCloseOnOverlayClick={false}
      standardHeight
      shouldCloseOnEsc={!isRtpsFlow}
    >
      <ApplyCardPage isPLCCModalFlow closePLCCModal={closePLCCModal} />
    </Modal>
  );
};

ApplyNowPLCCModal.propTypes = {
  modalStyles: PropTypes.shape({}).isRequired,
  isPLCCModalOpen: PropTypes.bool.isRequired,
  closePLCCModal: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isRtpsFlow: PropTypes.bool.isRequired,
};

export default ApplyNowPLCCModal;
