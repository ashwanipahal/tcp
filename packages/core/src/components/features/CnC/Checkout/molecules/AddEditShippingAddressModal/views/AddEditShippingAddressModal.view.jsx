import React from 'react';
import Modal from '../../../../../../common/molecules/Modal';

const AddEditShippingAddress = ({ modalState, addressFields, defaultOptions, modalType, toggleAddEditModal }) => {
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
    </Modal>
  )
}

export default AddEditShippingAddress;
