import React from 'react';
import { connect } from 'react-redux';
import AccountModal from '../views/AccountModal.view';
import { getModalComponent, getOpenState, getMessage } from './AccountModal.selectors';
import { closeModal } from './AccountModal.actions';

const getSpecificDataForModal = (modalToOpen, message) => {
  switch (modalToOpen) {
    case 'delete':
      return {
        heading: 'Are you sure you want to delete this address?',
        body: message,
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

const AccountModalContainer = ({ openState, modalToOpen, message, closeModalComponent }) => {
  const data = getSpecificDataForModal(modalToOpen, message);
  if (Object.keys(data).length) {
    return (
      <AccountModal
        openState={openState}
        modalToOpen={modalToOpen}
        data={data}
        closeModalComponent={closeModalComponent}
      />
    );
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModalContainer);
