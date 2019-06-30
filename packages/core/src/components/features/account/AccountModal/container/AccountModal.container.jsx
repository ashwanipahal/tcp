import React from 'react';
import { connect } from 'react-redux';
import AccountModal from '../views/AccountModal.view';
import { getModalComponent, getOpenState, getMessage } from './AccountModal.selectors';
import { closeModal, deleteAddress } from './AccountModal.actions';

// @flow

type Props = {
  openState: boolean,
  modalType: String,
  message: any,
  closeModalComponent: Function,
  onDeleteAddress: Function,
};

/**
 * @function getSpecificDataForModal  Used to render the JSX of the component
 * @param {modalType} String which modal to open : string - 'delete', 'verify'.
 * @param {message} message data passed from tile or the parent component which triggers the modal
 * @return S{[Object]} object on the basis of modal type.
 */
const getSpecificDataForModal = (modalType, message) => {
  switch (modalType) {
    case 'delete':
      return {
        heading: 'DELETE ADDRESS',
        title: 'Are you sure you want to delete this address?',
        description: message,
        buttons: {
          cancel: 'No, Dont Cancel',
          confirm: 'Yes Delete',
        },
      };
    default:
      return {};
  }
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
const AccountModalContainer = ({
  openState,
  modalType,
  message,
  closeModalComponent,
  onDeleteAddress,
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
