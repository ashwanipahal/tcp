import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../common/molecules/Modal';
import { getLabelValue } from '../../../../../../../utils';
import styles from '../styles/AddEditShippingAddressModal.style';
import withStyles from '../../../../../../common/hoc/withStyles';

const AddEditShippingAddress = ({
  modalState,
  addressFields,
  defaultOptions,
  modalType,
  toggleAddEditModal,
  actionButtons,
  labels,
  className,
}) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => toggleAddEditModal({ type: modalType })}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content ${className}`}
      fixedWidth
      closeIconDataLocator={`close${modalType}modal`}
      heading={
        modalType === 'add'
          ? getLabelValue(labels, 'lbl_shipping_addHeading', 'shipping', 'checkout')
          : getLabelValue(labels, 'lbl_shipping_editHeading', 'shipping', 'checkout')
      }
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
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

AddEditShippingAddress.defaultProps = {
  modalState: false,
  addressFields: () => {},
  defaultOptions: () => {},
  modalType: null,
  toggleAddEditModal: () => {},
  actionButtons: () => {},
  className: '',
};

export default withStyles(AddEditShippingAddress, styles);
export { AddEditShippingAddress as AddEditShippingAddressVanilla };
