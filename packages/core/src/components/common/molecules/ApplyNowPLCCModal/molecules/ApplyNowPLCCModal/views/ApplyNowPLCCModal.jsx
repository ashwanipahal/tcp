import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../Modal';
import ApplyCardPage from '../../../../../../features/browse/ApplyCardPage';
import { getLocator } from '../../../../../../../utils';

const ApplyNowPLCCModal = ({ modalStyles, isPLCCModalOpen, closePLCCModal, className }) => {
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
      minHeight="646px"
      inheritedStyles={modalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <ApplyCardPage isPLCCModalFlow />
    </Modal>
  );
};

ApplyNowPLCCModal.propTypes = {
  modalStyles: PropTypes.shape({}).isRequired,
  isPLCCModalOpen: PropTypes.bool.isRequired,
  closePLCCModal: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ApplyNowPLCCModal;
