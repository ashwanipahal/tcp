import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import DeleteAddressModal from './DeleteAddressModal.view';
import Notification from '../../../../common/molecules/Notification';

// @flow

type Props = {
  openState: Boolean,
  modalType: String,
  data: Object,
  onDeleteAddress: Function,
  closeModalComponent: Function,
  showUpdatedNotificationOnModal: Boolean,
  labels: Object,
};

/**
 * @function AccountModalView The AccountModalView component will render the modal on the basis of modalType
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {openState} openState open State of the modal : boolean value
 * @param {modalType} modalType which modal to open : string - 'delete', 'verify'
 * @param {data} data object with details to render in modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 */
class AccountModalView extends React.Component<Props> {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onCloseModal = () => {
    const { closeModalComponent } = this.props;
    return closeModalComponent();
  };

  /**
   * @function renderModal  Used to render the JSX of the component
   * @param {modalType} modalType which modal to open : string - 'delete', 'verify'.
   * @param {data} data object with details to render in modal
   * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
   * @param {closeModalComponent} closeModalComponent function to close the modal
   * @return {[Object]} JSX of the component
   */
  renderModal = () => {
    const { modalType, data, onDeleteAddress, closeModalComponent } = this.props;
    switch (modalType) {
      case 'deleteAddress':
        return (
          <DeleteAddressModal
            data={data}
            onDeleteAddress={onDeleteAddress}
            closeModalComponent={closeModalComponent}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { openState, data, showUpdatedNotificationOnModal, labels } = this.props;
    if (Object.keys(data).length) {
      const { heading, title } = data;
      return (
        <Modal
          colSet={{ large: 2, medium: 8, small: 6 }}
          isOpen={openState}
          onRequestClose={this.onCloseModal}
          title={title}
          heading={heading}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content"
        >
          {showUpdatedNotificationOnModal !== null && (
            <Notification
              status={showUpdatedNotificationOnModal}
              colSize={{ large: 11, medium: 7, small: 6 }}
              message={labels.errorMessage}
            />
          )}
          {this.renderModal()}
        </Modal>
      );
    }
    return null;
  }
}

export default AccountModalView;
