import React from 'react';
import { connect } from 'react-redux';
import AccountModal,VerifyAddressModalView from '../views/AccountModal.view';
import { getModalComponent, getOpenState, getMessage } from './AccountModal.selectors';
import { closeModal, deleteAddress, verifyAddressRequest } from './AccountModal.actions';

const getSpecificDataForModal = (modalToOpen, message) => {
  switch (modalToOpen) {
    case 'delete':
      return {
        heading: 'Are you sure you want to delete this address?',
        description: message,
        buttons: {
          cancel: 'No, Dont Cancel',
          confirm: 'Yes Delete',
        },
      };
      break;
    default:
      return {};
  }
};

const AccountModalContainer = ({
  openState,
  modalToOpen,
  message,
  closeModalComponent,
  onDeleteAddress,
  onVerifyAddress,
}) => {
  const data = getSpecificDataForModal(modalToOpen, message);
  if (modalToOpen === 'delete') {
    if (Object.keys(data).length) {
      return (
        <AccountModal
          openState={openState}
          modalToOpen={modalToOpen}
          data={data}
          closeModalComponent={closeModalComponent}
          onDeleteAddress={onDeleteAddress}
          onVerifyAddress={onVerifyAddress}
        />
      );
    }
  } else if (modalToOpen === 'verifyAddress') {
    // write verify
    <VerifyAddressModalView
          openState={openState}
          modalToOpen={modalToOpen}
          data={data}
          closeModalComponent={closeModalComponent}
          onDeleteAddress={onDeleteAddress}
          onVerifyAddress={onVerifyAddress}
        />
  }
  return null;
};

const mapStateToProps = state => {
  return {
    modalToOpen: getModalComponent(state),
    openState: getOpenState(state),
    message: getMessage(state),
  };
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    closeModalComponent: () => {
      dispatch(closeModal());
    },
    onDeleteAddress: ({ nickName }) => {
      dispatch(deleteAddress({ nickName }));
    },
    onVerifyAddress: payload => {
      dispatch(verifyAddressRequest(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModalContainer);
