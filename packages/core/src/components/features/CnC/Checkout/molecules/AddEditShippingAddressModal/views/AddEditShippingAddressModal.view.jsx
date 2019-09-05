import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../common/molecules/Modal';

const AddEditShippingAddress = ({
  modalState,
  addressFields,
  defaultOptions,
  modalType,
  toggleAddEditModal,
  actionButtons,
}) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => toggleAddEditModal({ type: modalType })}
      overlayClassName="TCPModal__Overlay"
      className="TCPModal__Content"
      fixedWidth
      closeIconDataLocator={`close${modalType}modal`}
      heading={modalType === 'add' ? 'ADD NEW ADDRESS' : 'EDIT ADDRESS'}
    >
      {addressFields()}
      {defaultOptions()}
      {actionButtons()}
    </Modal>
  );
};

AddEditShippingAddress.propTypes = {
  modalState: PropTypes.bool,
  addressFields: PropTypes.func,
  defaultOptions: PropTypes.func,
  modalType: PropTypes.string,
  toggleAddEditModal: PropTypes.func,
  actionButtons: PropTypes.func,
};

AddEditShippingAddress.defaultProps = {
  modalState: false,
  addressFields: () => {},
  defaultOptions: () => {},
  modalType: null,
  toggleAddEditModal: () => {},
  actionButtons: () => {},
};

export default AddEditShippingAddress;
