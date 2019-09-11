import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../common/molecules/Modal';
import { getLabelValue } from '../../../../../../../utils';
import ModalWrapper from '../styles/AddEditShippingAddressModal.style.native';

const AddEditShippingAddress = ({
  modalState,
  addressFields,
  defaultOptions,
  modalType,
  toggleAddEditModal,
  actionButtons,
  labels,
}) => {
  return (
    <Modal
      visible={modalState}
      onRequestClose={() => toggleAddEditModal({ type: modalType })}
      overlayClassName="TCPModal__Overlay"
      className="TCPModal__Content"
      fixedWidth
      closeIconDataLocator={`close${modalType}modal`}
      heading={
        modalType === 'add'
          ? getLabelValue(labels, 'lbl_shipping_addHeading', 'shipping', 'checkout')
          : getLabelValue(labels, 'lbl_shipping_editHeading', 'shipping', 'checkout')
      }
    >
      <ModalWrapper>
        {addressFields()}
        {defaultOptions()}
        {actionButtons()}
      </ModalWrapper>
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
  labels: PropTypes.shape({}).isRequired,
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
