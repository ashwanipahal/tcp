import React from 'react';
import { connect } from 'react-redux';
import AccountModal from '../views/AccountModal.view';
import { getModalComponent, getOpenState, getMessage } from './AccountModal.selectors';
import { closeModal, deleteAddress } from './AccountModal.actions';
import { showUpdatedNotificationOnModalState } from '../../AddressBook/container/AddressBook.selectors';
import labels from '../../AddressBook/container/AddressBook.labels';

// @flow

type Props = {
  openState: boolean,
  modalType: null,
  message: any,
  closeModalComponent: Function,
  onDeleteAddress: Function,
  showUpdatedNotificationOnModal: boolean,
};

/**
 * @function getSpecificDataForModal  Used to render the JSX of the component
 * @param {modalType} String which modal to open : string - 'delete', 'verify'.
 * @param {message} message data passed from tile or the parent component which triggers the modal
 * @return S{[Object]} object on the basis of modal type.
 */
const getSpecificDataForModal = (modalType, message) => {
  return {
    heading: labels.deleteAddressHeading,
    title: labels.deleteAddressTitle,
    description: message,
    buttons: {
      cancel: labels.cancel,
      confirm: labels.deleteConfirm,
    },
  };
};

/**
 * @function AccountModalContainer The AccountModalContainer component is the main container for the account section modals
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * This component is first called when any modal action is triggered.
 * @param {openState} openState open State of the modal : boolean value
 * @param {modalType} modalType which modal to open : string - 'delete', 'verify'
 * @param {message} message data passed from tile or the parent component which triggers the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 */
export const AccountModalContainer = ({
  openState,
  modalType,
  message,
  closeModalComponent,
  onDeleteAddress,
  showUpdatedNotificationOnModal,
}: Props) => {
  const data = getSpecificDataForModal(modalType, message);
  if (Object.keys(data).length) {
    return (
      <AccountModal
        openState={openState}
        modalType={modalType}
        data={data}
        closeModalComponent={closeModalComponent}
        onDeleteAddress={onDeleteAddress}
        showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        labels={labels}
      />
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    modalType: getModalComponent(state),
    openState: getOpenState(state),
    message: getMessage(state),
    showUpdatedNotificationOnModal: showUpdatedNotificationOnModalState(state),
  };
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    closeModalComponent: () => {
      dispatch(closeModal());
    },
    onDeleteAddress: payload => {
      dispatch(deleteAddress(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModalContainer);
